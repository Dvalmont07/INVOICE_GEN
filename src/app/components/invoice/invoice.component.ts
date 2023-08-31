import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Invoice } from 'src/app/classes/invoice.class';
import { InvoiceService } from 'src/services/invoice/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  private _params: Params = {};
  public invoice: Invoice = new Invoice();
  private _formatedDate = Intl.DateTimeFormat("pt-BR");

  @Input() invoiceId: number = 0;

  constructor(
    private _invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._params = params;
    });
  }

  ngOnInit() {
    this.getInvoiceById(this.invoiceId);
  }

  public getInvoiceById(id: number) {
    this._invoiceService.getAll()
      .subscribe(invoices => {
        this.invoice = invoices
          .filter(invoice => {
            return invoice.Id === id;
          })[0];
      });
  }

  public dateTransform(date: Date) {
    return this._formatedDate.format(date);
  }

  public refreshBlock() {
    this.getInvoiceById(this.invoiceId);
  }
}