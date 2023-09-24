import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
      .subscribe(
        invoices => {
          Object.assign(
            this.invoice,
            invoices
              .filter(
                invoice => {
                  return invoice.Id === id;
                })[0]
          );
          this.fillInvoiceWithItems(id);
        });
  }

  private fillInvoiceWithItems(id: number) {
    this._invoiceItemsService.getAll().subscribe(invoiceItems => {
      Object.assign(
        this.invoice.InvoiceItems,
        invoiceItems
          .filter(
            item => {
              return item.InvoiceId === id;
            })
          .map(
            invoiceIntemToMap => invoiceIntemToMap = new InvoiceItems(
              invoiceIntemToMap.Description,
              invoiceIntemToMap.Quantity,
              invoiceIntemToMap.Price
            )
          )
      )
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

  public generateInvoice() {
    let preview = document.querySelector("#preview") as HTMLElement;
    //TODO: split into many pages if big
var fff = this;

    // preview.style.width = "210mm";
    // preview.style.height = "297mm";
    html2canvas(preview).then(function (canvas) {

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
      const positionX = 0;
      const positionY = 0;
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHight = pdf.internal.pageSize.getHeight();

      pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHight);


      // const footerImgData = './../../../assets/image/test.png';
      // const footerWidth = 4.8; // Adjust the width of the footer image as needed
      // const footerHeight = 4.8; // Adjust the height of the footer image as needed
      // const footerX = (imgWidth - footerWidth - 5); // Adjust the X position of the footer image as needed
      // const footerY = imgHight - footerHeight - 5; // Adjust the Y position of the footer image as needed
      // pdf.addImage(footerImgData, 'PNG', footerX, footerY, footerWidth, footerHeight);

      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }
}
