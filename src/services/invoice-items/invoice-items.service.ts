import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceItems } from 'src/app/classes/invoice-items.class';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemsService {

  private _dataUrl = '/assets/data/public/invoice-items.data.json';
  
  constructor(private _http: HttpClient) { }

  public getAll(): Observable<InvoiceItems[]> {
    return this._http.get<InvoiceItems[]>(this._dataUrl);
  }
  public getById(id: number) {
    
  }

}
