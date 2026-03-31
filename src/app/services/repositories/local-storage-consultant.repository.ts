import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Consultant } from '../../classes/consultant.class';
import { IRepository } from './repository.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageConsultantRepository implements IRepository<Consultant> {
  private readonly STORAGE_KEY = 'invoice_gen_consultants';

  getAll(): Observable<Consultant[]> {
    const consultantsJson = localStorage.getItem(this.STORAGE_KEY);
    if (!consultantsJson) return of([]);
    
    try {
      const parsed = JSON.parse(consultantsJson) as any[];
      return of(parsed.map(item => Consultant.fromJSON(item)));
    } catch (e) {
      console.error('Error parsing consultants from localStorage', e);
      return of([]);
    }
  }

  getById(id: string | number): Observable<Consultant | undefined> {
    // Current Consultant class doesn't have an ID, using 'fullName' as unique identifier for now
    return new Observable(subscriber => {
      this.getAll().subscribe(consultants => {
        const consultant = consultants.find(c => c.fullName === id);
        subscriber.next(consultant);
        subscriber.complete();
      });
    });
  }

  save(item: Consultant): Observable<Consultant> {
    return new Observable(subscriber => {
      this.getAll().subscribe(consultants => {
        const index = consultants.findIndex(c => c.fullName === item.fullName);
        if (index >= 0) {
          consultants[index] = item;
        } else {
          consultants.push(item);
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consultants.map(c => c.toJSON())));
        subscriber.next(item);
        subscriber.complete();
      });
    });
  }

  delete(id: string | number): Observable<void> {
    return new Observable(subscriber => {
      this.getAll().subscribe(consultants => {
        const filtered = consultants.filter(c => c.fullName !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered.map(c => c.toJSON())));
        subscriber.next();
        subscriber.complete();
      });
    });
  }
}
