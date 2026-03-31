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


  public dateTransform(date: Date) {
    return this.formatedDate.format(date);
  }

  public generateInvoice() {
    let preview = document.querySelector("#preview") as HTMLElement;
    
    // Advanced PDF generation with high resolution
    const options = {
      scale: 3, // Super-sampling for high quality
      useCORS: true, // Support for external images/fonts
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: 1140, // Fixed width for consistent layout
    };

    html2canvas(preview, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to preserve aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      
      const displayWidth = pdfWidth;
      const displayHeight = pdfWidth / ratio;

      // Add image centered and properly scaled
      pdf.addImage(imgData, 'PNG', 0, 0, displayWidth, displayHeight, undefined, 'FAST');
      
      pdf.save(this.getPDFTitle()); // Generated High-Res PDF   
      
      // Auto-save to history
      this.invoice.id = new Date().getTime().toString();
      this.invoiceRepo.save(this.invoice).subscribe(() => {
        console.log('Invoice auto-saved to history and generated with high quality');
        this.onGenerated.emit();
      });
    });
  }

  private getPDFTitle(): string {
    return `${this.invoice.client.name} - Nota ${this.invoice.number} - ${this.invoice.dueDate.getFullYear()}${(this.invoice.dueDate.getMonth() + 1).toString().padStart(2, '0')}.pdf`;
  }
}
