import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from 'src/app/classes/invoice.class';
import { EventEmitter, Output } from '@angular/core';
import { IndexedDbInvoiceRepository } from 'src/app/services/repositories/indexed-db-invoice.repository';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent {

  @Input() invoice: Invoice = new Invoice();
  @Output() onGenerated = new EventEmitter<void>();

  constructor(private invoiceRepo: IndexedDbInvoiceRepository) { }

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
    
    // Add a temporary class to body to force desktop layout for html2canvas
    document.body.classList.add('pdf-exporting');

    // Force A4 size layout (1140px width is perfect for A4 ratio used here)
    const originalWidth = preview.style.width;
    const originalPosition = preview.style.position;
    
    preview.style.width = '1140px';
    preview.style.position = 'absolute'; // Prevent pushing other elements

    // Wait for the browser to recalculate layout
    setTimeout(() => {
      const width = preview.clientWidth;
      const height = preview.scrollHeight;

      const options = {
        scale: 2, // High resolution (2 is usually enough for A4)
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 1140, // lock width
        height: height,
        windowWidth: 1140, // lock window width to bypass mobile media queries
        onclone: (clonedDoc: Document) => {
          const clonedPreview = clonedDoc.querySelector("#preview") as HTMLElement;
          clonedPreview.style.width = '1140px';
          clonedPreview.style.minHeight = '1612px';
          clonedPreview.style.display = 'flex';
          const header = clonedPreview.querySelector('header');
          if (header) {
            header.style.display = 'flex';
          }
        }
      };

      html2canvas(preview, options)
        .then((canvas: HTMLCanvasElement) => {
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          const pdf = new jsPDF('p', 'mm', 'a4');

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const ratio = canvasWidth / canvasHeight;

          // Full width A4 fitting
          let imgWidth = pdfWidth;
          let imgHeight = pdfWidth / ratio;

          pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

          pdf.save(this.getPDFTitle());

          this.invoice.id = new Date().getTime().toString();
          this.invoiceRepo.save(this.invoice).subscribe(() => {
            this.onGenerated.emit();
          });
        })
        .finally(() => {
          // Always restore styles, even on error
          preview.style.width = originalWidth;
          preview.style.position = originalPosition;
          document.body.classList.remove('pdf-exporting');
        });
    }, 100);
  }

  private getPDFTitle(): string {
    return `${this.invoice.client.name} - Nota ${this.invoice.number} - ${this.invoice.dueDate.getFullYear()}${(this.invoice.dueDate.getMonth() + 1).toString().padStart(2, '0')}.pdf`;
  }
}
