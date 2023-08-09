import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultant } from 'src/app/classes/consultant.class';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(
    private _http: HttpClient
  ) { }
  private _dataUrl = '/assets/data/public/consultant.data.json';

  public getData() {
    return this._http.get<Consultant>(this._dataUrl);
  }
  public update(consultant: Consultant) {

  }
}
