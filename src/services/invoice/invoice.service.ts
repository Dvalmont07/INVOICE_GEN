import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/classes/invoice.class';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private _dataUrl = '/assets/data/public/invoice.data.json';
  
  constructor(private _http: HttpClient) { }

  public getAll(): Observable<Invoice[]> {
    return this._http.get<Invoice[]>(this._dataUrl);
  }
  public getById(id: number) {
    
  }

}
