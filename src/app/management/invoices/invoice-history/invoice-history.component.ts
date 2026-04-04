import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../../classes/invoice.class';
import { IndexedDbInvoiceRepository } from '../../../services/repositories/indexed-db-invoice.repository';
import { Router } from '@angular/router';

// Contrato do ViewModel para a View (View Model Pattern)
interface InvoiceViewModel {
  formattedDate: string;
  clientName: string;
  referenceText: string;
  formattedTotal: string;
  rawInvoice: Invoice;
}

@Component({
  selector: 'app-invoice-history',
  template: `
    <div class="management-container">
      <h2>Histórico de Faturas</h2>

      <div *ngIf="viewModels.length === 0" class="empty-state">
        <i>📄</i>
        <p>Nenhuma fatura gerada ainda.</p>
        <a routerLink="/invoice" class="btn btn-primary" style="display: inline-flex; margin-top: 1rem;">Gerar Minha Primeira Fatura</a>
      </div>

      <table *ngIf="viewModels.length > 0" class="data-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Cliente</th>
            <th>Mês Ref.</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of viewModels">
            <td>{{ item.formattedDate }}</td>
            <td>{{ item.clientName }}</td>
            <td>{{ item.referenceText }}</td>
            <td>{{ item.formattedTotal }}</td>
            <td>
              <div style="display: flex; gap: 0.5rem;">
                <button (click)="viewInvoice(item.rawInvoice)" class="btn btn-secondary">Visualizar</button>
                <button (click)="deleteInvoice(item.rawInvoice.id)" class="btn btn-danger">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../../management.css']
})
export class InvoiceHistoryComponent implements OnInit {
  viewModels: InvoiceViewModel[] = [];

  constructor(
    private invoiceRepo: IndexedDbInvoiceRepository,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.invoiceRepo.getAll().subscribe(data => {
      const reversed = data.reverse(); // Show newest first
      this.viewModels = reversed.map(invoice => this.mapToViewModel(invoice));
    });
  }

  private mapToViewModel(invoice: Invoice): InvoiceViewModel {
    // Formatação de Moeda Nativa do JS sem uso de Pipes sujos na View
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    // Simulando parse de data limpo
    // Formatação de data robusta
    const dateStr = typeof invoice.id === 'string' ? invoice.id : invoice.id.toString();
    const dateObj = new Date(invoice.id);
    const formattedDate = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      : dateStr;

    return {
      formattedDate: formattedDate,
      clientName: invoice.client?.name || 'Desconhecido',
      referenceText: `${invoice.referenceFullMonth || ''} / ${invoice.referenceYear || ''}`,
      formattedTotal: formatter.format(invoice.total || 0),
      rawInvoice: invoice
    };
  }

  viewInvoice(invoice: Invoice): void {
    // We'll store it in a temporary service or pass it via state to the generator
    // For now, let's navigate to generator with this ID
    this.router.navigate(['/invoice'], { queryParams: { fromHistory: invoice.id } });
  }

  deleteInvoice(id: string | number): void {
    if (confirm('Deseja excluir esta fatura do histórico?')) {
      this.invoiceRepo.delete(id).subscribe(() => this.loadHistory());
    }
  }
}
