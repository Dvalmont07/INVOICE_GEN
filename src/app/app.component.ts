import { Component } from '@angular/core';
import { Invoice } from './classes/invoice.class';
import { INVOICE } from './data/public/p-invoice.data';
import { Consultant } from './classes/consultant.class';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVOICE_GEN';
  invoice: Invoice = new Invoice();
  consultant: any;
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.invoice = INVOICE;
    this.getData();
  }

  private getData() {
    // this._consultantService.getData().subscribe(data => this.consultant = data);
    let dataUrl = '../assets/data/public/consultant.data.json';
    this._http.get(dataUrl).subscribe(data => this.consultant = data);


  }
}
