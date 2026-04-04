import { Injectable } from '@angular/core';
import { Observable, from, map, switchMap, of } from 'rxjs';
import { Consultant } from '../../classes/consultant.class';
import { IRepository } from './repository.interface';
import { IndexedDbService } from '../indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbConsultantRepository implements IRepository<Consultant> {
  constructor(private db: IndexedDbService) {}

  getAll(includeInactive: boolean = false): Observable<Consultant[]> {
    return from(this.db.consultants.toArray()).pipe(
      map(items => items.map(item => Consultant.fromJSON(item))),
      map(items => includeInactive ? items : items.filter(i => i.active !== false))
    );
  }

  getById(id: string | number): Observable<Consultant | undefined> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId as number)) {
        // Fallback search by full name
        return from(this.db.consultants.toArray()).pipe(
            map(items => items.find(c => Consultant.fromJSON(c).fullName === id)),
            map(item => item ? Consultant.fromJSON(item) : undefined)
        );
    }
    return from(this.db.consultants.get(numericId as number)).pipe(
      map(item => item ? Consultant.fromJSON(item) : undefined)
    );
  }

  save(item: Consultant): Observable<Consultant> {
    const data = item.toJSON();
    
    // Deduplication logic: If no ID, check if a consultant with the same name exists
    const checkDuplicate$ = item.id 
      ? of(undefined) 
      : from(this.db.consultants.where('firstName').equals(item.firstName).and(c => c.lastName === item.lastName).first());

    return checkDuplicate$.pipe(
      switchMap(existing => {
        if (existing && !item.id) {
          data.id = existing.id;
          item.id = existing.id;
        }
        return from(this.db.consultants.put(data as any));
      }),
      map(id => {
        item.id = id;
        return item;
      })
    );
  }

  delete(id: string | number): Observable<void> {
    return this.getById(id).pipe(
      switchMap(consultant => {
        if (consultant) {
          consultant.active = false;
          return this.save(consultant).pipe(map(() => void 0));
        }
        return of(void 0);
      })
    );
  }
}
