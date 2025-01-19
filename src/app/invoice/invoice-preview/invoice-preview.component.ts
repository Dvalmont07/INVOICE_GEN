import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from 'src/app/classes/invoice.class';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent {

  constructor() { }

  formatedDate = Intl.DateTimeFormat("pt-BR");

  @Input() invoice: Invoice = new Invoice();


  public dateTransform(date: Date) {
    return this.formatedDate.format(date);
  }

  public generateInvoice() {
    let preview = document.querySelector("#preview") as HTMLElement;
    //TODO: split into many pages if big

    html2canvas(preview).then((canvas) => {

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
      const positionX = 0;
      const positionY = 0;
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHight = pdf.internal.pageSize.getHeight();

      pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHight);     
      pdf.save(this.getPDFTitle()); // Generated PDF   
    });
  }

  private getPDFTitle(): string {
    let date = new Date();
    return `${this.invoice.client.name} - Nota ${this.invoice.number} - ${this.invoice.referenceYear}${date.getMonth() + 1}.pdf`;
  }

}
