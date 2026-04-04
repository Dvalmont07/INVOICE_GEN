import { Injectable } from '@angular/core';
import { Observable, from, map, switchMap, of, take } from 'rxjs';
import { Invoice } from '../../classes/invoice.class';
import { IRepository } from './repository.interface';
import { IndexedDbService } from '../indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbInvoiceRepository implements IRepository<Invoice> {
  constructor(private db: IndexedDbService) {}

  getAll(includeInactive: boolean = false): Observable<Invoice[]> {
    return from(this.db.invoices.toArray()).pipe(
      map(items => items.map(item => Invoice.fromJSON(item))),
      map(items => includeInactive ? items : items.filter(i => i.active !== false))
    );
  }

  getById(id: string | number): Observable<Invoice | undefined> {
    const numericId = typeof id === 'string' ? (isNaN(parseInt(id, 10)) ? id : parseInt(id, 10)) : id;
    return from(this.db.invoices.get(numericId as any)).pipe(
      map(item => item ? Invoice.fromJSON(item) : undefined)
    );
  }

  save(item: Invoice): Observable<Invoice> {
    const data = item.toJSON();
    // Use put to update or create
    return from(this.db.invoices.put(data as any)).pipe(
      map(id => {
        item.id = id;
        return item;
      })
    );
  }

  delete(id: string | number): Observable<void> {
    return this.getById(id).pipe(
      take(1),
      switchMap(invoice => {
        if (invoice) {
          invoice.active = false;
          return this.save(invoice).pipe(map(() => void 0));
        }
        return of(void 0);
      })
    );
  }
}
