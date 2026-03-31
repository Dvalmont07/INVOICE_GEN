import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../classes/invoice.class';
import { IRepository } from './repository.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageInvoiceRepository implements IRepository<Invoice> {
  private readonly STORAGE_KEY = 'invoice_gen_history';

  getAll(): Observable<Invoice[]> {
    const historyJson = localStorage.getItem(this.STORAGE_KEY);
    if (!historyJson) return of([]);
    
    try {
      const parsed = JSON.parse(historyJson) as any[];
      return of(parsed.map(item => Invoice.fromJSON(item)));
    } catch (e) {
      console.error('Error parsing invoice history from localStorage', e);
      return of([]);
    }
  }

  getById(id: string | number): Observable<Invoice | undefined> {
    return new Observable(subscriber => {
      this.getAll().subscribe(history => {
        const invoice = history.find(i => i.id === id);
        subscriber.next(invoice);
        subscriber.complete();
      });
    });
  }

  save(item: Invoice): Observable<Invoice> {
    return new Observable(subscriber => {
      this.getAll().subscribe(history => {
        const index = history.findIndex(i => i.id === item.id);
        if (index >= 0) {
          history[index] = item;
        } else {
          history.push(item);
        }
        // Keep only last 50 invoices to prevent storage overflow
        if (history.length > 50) {
          history.shift();
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history.map(i => i.toJSON())));
        subscriber.next(item);
        subscriber.complete();
      });
    });
  }

  delete(id: string | number): Observable<void> {
    return new Observable(subscriber => {
      this.getAll().subscribe(history => {
        const filtered = history.filter(i => i.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered.map(i => i.toJSON())));
        subscriber.next();
        subscriber.complete();
      });
    });
  }
}
