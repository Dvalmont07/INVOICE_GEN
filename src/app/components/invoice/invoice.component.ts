import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/classes/client.class';
import { InvoiceItems } from 'src/app/classes/invoice-items.class';
import { Invoice } from 'src/app/classes/invoice.class';
import { InvoiceItemsService } from 'src/services/invoice-items/invoice-items.service';
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
  @Input() consultantCompanyName: string = "";
  @Input() client: Client = new Client();

  constructor(
    private _invoiceService: InvoiceService,
    private _invoiceItemsService: InvoiceItemsService,
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
        Object.assign(
          this.invoice,
          invoices
            .filter(invoice => {
              return invoice.Id === id;
            })[0]
        );

        this._invoiceItemsService.getAll().subscribe(invoiceItems => {
          let iv : InvoiceItems[] = [];
          
          iv.push(
            new InvoiceItems("Percentual referente aos 20% sobre os RS 1.000,00 creditados em junho de 2003",1,10),
            new InvoiceItems("NAda 2",1,10),
            new InvoiceItems("NAda 3",3,10)
            );
            iv[0].Id = 1;
            iv[0].InvoiceId = 50001;
            iv[0].Price = 200;
            iv[0].Quantity = 2;
          this.invoice.InvoiceItems =[...iv];
          Object.assign(
            this.invoice.InvoiceItems,
            invoiceItems.filter(item => {
              return item.InvoiceId === id;
            })
          )
        });

      });
  }

  public dateTransform(date: Date) {
    return this._formatedDate.format(date);
  }

  public refreshBlock() {
    this.getInvoiceById(this.invoiceId);
  }

  public clearBlock() {
    this.invoice = new Invoice();
  }
}
