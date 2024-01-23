import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/classes/client.class';
import { ClientService } from 'src/services/client/client.service';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Consultant } from 'src/app/classes/consultant.class';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public client: Client = new Client();
  public isPreviewOpened: boolean = false;
  public invoiceId: number = 0;

  @Input() clientId: number = 0;
  @Input() consultant: Consultant = new Consultant();

  @ViewChild(InvoiceComponent) invoiceComponent!: InvoiceComponent;
  public constructor(
    private _clientService: ClientService,
  ) {
    //TODO: generate hash to URLs
    //this.activatedRoute.queryParams.subscribe((params: Params) => {
    //this._params = params;
    //});
  }

  ngOnInit() {
    this.getClientById();
  }

  private getClientById() {
    if (this.clientId > 0) {
      this._clientService.getAll().subscribe(clients => {
        this.client = clients
          .filter(client => { return client.Id === this.clientId })[0];
      });
    }
  }
  public openInvoice() {
    this.invoiceId = Number(this.invoiceId);
    if (this.invoiceId > 0) {
      setTimeout(() => {
        let invoiceSection = document.querySelector("#invoice-section") as HTMLElement;
        if (invoiceSection) {
          invoiceSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });

          if (this.invoiceComponent) {
            this.invoiceComponent.refreshBlock();
          }
        }
      }, 30);
    }
  }

  public backToTheTop() {
    setTimeout(() => {
      let topPage = document.querySelector("#top-page") as HTMLElement;
      topPage.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 30);
  }

  public backToInvoicesMenu() {
    setTimeout(() => {
      let topPage = document.querySelector("#invoices-menu") as HTMLElement;
      topPage.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 30);
  }

  public refresBlock() {
    this.getClientById();
  }
}
