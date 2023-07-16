import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from 'src/app/classes/invoice.class';


@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {

  constructor() { }

  @Input() invoice: Invoice = new Invoice();

  ngOnInit() {
  }

  public generateInvoice(){
    let preview = document.querySelector("#preview") as HTMLElement;

    html2canvas(preview).then(function(canvas) {
      
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
      const positionX = 0;
      const positionY = 0;
      const imgWidth = 210;
      //let pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      //let heightLeft = imgHeight;
      
      pdf.addImage(contentDataURL, 'PNG', positionX, positionY , imgWidth, imgHeight);

      pdf.save('MYPdf.pdf'); // Generated PDF   
  });
  }

}
