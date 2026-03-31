import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '../../classes/client.class';
import { IRepository } from './repository.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageClientRepository implements IRepository<Client> {
  private readonly STORAGE_KEY = 'invoice_gen_clients';

  getAll(): Observable<Client[]> {
    const clientsJson = localStorage.getItem(this.STORAGE_KEY);
    if (!clientsJson) return of([]);
    
    try {
      const parsed = JSON.parse(clientsJson) as any[];
      return of(parsed.map(item => Client.fromJSON(item)));
    } catch (e) {
      console.error('Error parsing clients from localStorage', e);
      return of([]);
    }
  }

  getById(id: string | number): Observable<Client | undefined> {
    // Current Client class doesn't have an ID, using 'name' as unique identifier for now
    return new Observable(subscriber => {
      this.getAll().subscribe(clients => {
        const client = clients.find(c => c.name === id);
        subscriber.next(client);
        subscriber.complete();
      });
    });
  }

  save(item: Client): Observable<Client> {
    return new Observable(subscriber => {
      this.getAll().subscribe(clients => {
        const index = clients.findIndex(c => c.name === item.name);
        if (index >= 0) {
          clients[index] = item;
        } else {
          clients.push(item);
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clients.map(c => c.toJSON())));
        subscriber.next(item);
        subscriber.complete();
      });
    });
  }

  delete(id: string | number): Observable<void> {
    return new Observable(subscriber => {
      this.getAll().subscribe(clients => {
        const filtered = clients.filter(c => c.name !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered.map(c => c.toJSON())));
        subscriber.next();
        subscriber.complete();
      });
    });
  }
}
