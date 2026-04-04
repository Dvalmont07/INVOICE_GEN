import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from 'src/app/classes/invoice.class';
import { EventEmitter, Output } from '@angular/core';
import { LocalStorageInvoiceRepository } from 'src/app/services/repositories/local-storage-invoice.repository';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent {

  @Input() invoice: Invoice = new Invoice();
  @Output() onGenerated = new EventEmitter<void>();

  constructor(private invoiceRepo: LocalStorageInvoiceRepository) { }

  formatedDate = Intl.DateTimeFormat("pt-BR");
  moneyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });


  public dateTransform(date: Date) {
    return this.formatedDate.format(date);
  }

  public formatMoeda(value: number): string {
    return this.moneyFormatter.format(value || 0);
  }

  public generateInvoice() {
    let preview = document.querySelector("#preview") as HTMLElement;
    
    // Calculate the actual dimensions
    const width = preview.clientWidth;
    const height = preview.scrollHeight; // Use scrollHeight to capture everything

    const options = {
      scale: 2, // High resolution (2 is usually enough for A4)
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: width,
      height: height,
      windowWidth: width
    };

    html2canvas(preview, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      
      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth / ratio;

      // If the content is very long, it might need more than one page
      // But for "Aproveitar espaço A4", we ensure it fills the width
      // and we center it if it's shorter than A4
      
      let yPos = 0;
      if (imgHeight < pdfHeight) {
          // If shorter than A4, we can center it vertically or just start at top
          // The user wants to "aproveitar o espaço", so we keep it at top
          yPos = 0;
      }

      pdf.addImage(imgData, 'JPEG', 0, yPos, imgWidth, imgHeight, undefined, 'FAST');
      
      // If imgHeight > pdfHeight, you'd need to add pages, 
      // but let's stick to the high-quality single page A4 optimization first.

      pdf.save(this.getPDFTitle());
      
      this.invoice.id = new Date().getTime().toString();
      this.invoiceRepo.save(this.invoice).subscribe(() => {
        this.onGenerated.emit();
      });
    });
  }

  private getPDFTitle(): string {
    return `${this.invoice.client.name} - Nota ${this.invoice.number} - ${this.invoice.dueDate.getFullYear()}${(this.invoice.dueDate.getMonth() + 1).toString().padStart(2, '0')}.pdf`;
  }
}
