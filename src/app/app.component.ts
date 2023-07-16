import { Component } from '@angular/core';
import { Invoice } from './classes/invoice.class';
import { CONSULTANT } from './data/private/consultant.data';
import { SERVICES } from './data/public/services.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVOICE_GEN';
  invoice: Invoice = new Invoice();

  ngOnInit() {
    this.invoice.Consultant = CONSULTANT;
    this.invoice.Services = SERVICES;
  }
}
