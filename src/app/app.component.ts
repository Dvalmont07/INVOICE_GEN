import { Component } from '@angular/core';
import { Invoice } from './classes/invoice.class';
// import { INVOICE } from './data/public/p-invoice.data';
// import { INVOICE } from './data/private/private-jflimpeza/invoice.data';
import { INVOICE } from './data/private/private-eslimpeza/invoice.data';
//import { INVOICE } from './data/private/private-artbrilho/invoice.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVOICE_GEN';
  invoice: Invoice = new Invoice();

  ngOnInit() {
    this.invoice = INVOICE;
  }
}
