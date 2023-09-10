import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/classes/client.class';
import { ClientService } from 'src/services/client/client.service';
import { InvoiceComponent } from '../invoice/invoice.component';

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
  @Input() consultantCompanyName: string = "";

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
  public openInvoice(id: number) {
    if (id > 0) {
      this.invoiceId = id;

      setTimeout(() => {
        let invoiceSection = document.querySelector("#invoice-section") as HTMLElement;

        invoiceSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });

        if (this.invoiceComponent) {
          this.invoiceComponent.refreshBlock();
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

  public refresBlock() {
    this.getClientById();
  }
}
