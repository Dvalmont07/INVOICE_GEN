import { Component } from '@angular/core';
import { Invoice } from './classes/invoice.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVOICE_GEN';
  invoice: Invoice = new Invoice();
}
