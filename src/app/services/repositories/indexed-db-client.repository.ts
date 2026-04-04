import { Injectable } from '@angular/core';
import { Observable, from, map, switchMap, of } from 'rxjs';
import { Client } from '../../classes/client.class';
import { IRepository } from './repository.interface';
import { IndexedDbService } from '../indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbClientRepository implements IRepository<Client> {
  constructor(private db: IndexedDbService) {}

  getAll(includeInactive: boolean = false): Observable<Client[]> {
    return from(this.db.clients.toArray()).pipe(
      map(items => items.map(item => Client.fromJSON(item))),
      map(items => includeInactive ? items : items.filter(i => i.active !== false))
    );
  }

  getById(id: string | number): Observable<Client | undefined> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId as number)) {
        // Fallback search by name if ID is string based but not numeric (original behavior for some parts)
        return from(this.db.clients.where('name').equals(id as string).first()).pipe(
            map(item => item ? Client.fromJSON(item) : undefined)
        );
    }
    return from(this.db.clients.get(numericId as number)).pipe(
      map(item => item ? Client.fromJSON(item) : undefined)
    );
  }

  save(item: Client): Observable<Client> {
    const data = item.toJSON();
    
    // Deduplication logic: If no ID, check if a client with the same name exists
    const checkDuplicate$ = item.id 
      ? of(undefined) 
      : from(this.db.clients.where('name').equals(item.name).first());

    return checkDuplicate$.pipe(
      switchMap(existing => {
        if (existing && !item.id) {
          data.id = existing.id;
          item.id = existing.id;
        }
        return from(this.db.clients.put(data as any));
      }),
      map(id => {
        item.id = id;
        return item;
      })
    );
  }

  delete(id: string | number): Observable<void> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    // Soft delete: set active to false
    return this.getById(id).pipe(
      switchMap(client => {
        if (client) {
          client.active = false;
          return this.save(client).pipe(map(() => void 0));
        }
        return of(void 0);
      })
    );
  }

  // Real delete if ever needed
  hardDelete(id: number): Observable<void> {
    return from(this.db.clients.delete(id));
  }
}
