import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/classes/client.class';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: HttpClient) { }
  private _dataUrl = '/assets/data/public/client.data.json';

  public getAll(): Observable<Client[]> {
    return this._http.get<Client[]>(this._dataUrl);
  }
  public getById(id: number) {
    
  }

}
