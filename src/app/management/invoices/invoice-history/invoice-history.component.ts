import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../../classes/invoice.class';
import { LocalStorageInvoiceRepository } from '../../../services/repositories/local-storage-invoice.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-history',
  template: `
    <div class="management-container">
      <h2>Histórico de Faturas</h2>

      <div *ngIf="history.length === 0" class="empty-state">
        <i>📄</i>
        <p>Nenhuma fatura gerada ainda.</p>
        <a routerLink="/invoice" class="btn btn-primary" style="display: inline-flex; margin-top: 1rem;">Gerar Minha Primeira Fatura</a>
      </div>

      <table *ngIf="history.length > 0" class="data-table">
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
          <tr *ngFor="let invoice of history">
            <td>{{ invoice.id | date:'dd/MM/yyyy HH:mm' }}</td>
            <td>{{ invoice.client.name }}</td>
            <td>{{ invoice.referenceFullMonth }} / {{ invoice.referenceYear }}</td>
            <td>{{ invoice.total | currency:'BRL' }}</td>
            <td>
              <div style="display: flex; gap: 0.5rem;">
                <button (click)="viewInvoice(invoice)" class="btn btn-secondary">Visualizar</button>
                <button (click)="deleteInvoice(invoice.id)" class="btn btn-danger">Excluir</button>
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
  history: Invoice[] = [];

  constructor(
    private invoiceRepo: LocalStorageInvoiceRepository,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.invoiceRepo.getAll().subscribe(data => {
      this.history = data.reverse(); // Show newest first
    });
  }

  viewInvoice(invoice: Invoice): void {
    // We'll store it in a temporary service or pass it via state to the generator
    // For now, let's navigate to generator with this ID
    this.router.navigate(['/invoice'], { queryParams: { fromHistory: invoice.id } });
  }

  deleteInvoice(id: string): void {
    if (confirm('Deseja excluir esta fatura do histórico?')) {
      this.invoiceRepo.delete(id).subscribe(() => this.loadHistory());
    }
  }
}
