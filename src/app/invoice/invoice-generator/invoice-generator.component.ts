import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../classes/invoice.class';
import { InvoiceItemsConfigParams } from '../../classes/invoice-items-config-params.class';
import { InvoiceItemsConfig } from '../../classes/invoice-items-config.class';
import { IndexedDbClientRepository } from '../../services/repositories/indexed-db-client.repository';
import { IndexedDbConsultantRepository } from '../../services/repositories/indexed-db-consultant.repository';
import { IndexedDbInvoiceRepository } from '../../services/repositories/indexed-db-invoice.repository';

@Component({
  selector: 'app-invoice-generator',
  template: `
    <main class="management-container">
      <header class="management-header" style="margin-bottom: 2rem;">
        <h2>Gerador de Fatura</h2>
      </header>

      <section>
        <div class="card" style="padding: 1.5rem 0; margin-bottom: 3rem;">
          <h3 style="margin-top: 0; border-bottom: 1px solid var(--brand-border); padding-bottom: 1.25rem; margin-bottom: 2rem; font-size: 1.25rem;">
            Configuração da Fatura
          </h3>
          
          <div class="generator-grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Cliente</label>
              <select [(ngModel)]="invoice.client.name" (change)="onClientSelect($event)" class="form-control">
                <option value="">Selecione um cliente...</option>
                <option *ngFor="let client of clients" [value]="client.name">{{ client.name }}</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label>Consultor</label>
              <select [(ngModel)]="invoice.consultant.fullName" (change)="onConsultantSelect($event)" class="form-control">
                <option value="">Selecione um consultor...</option>
                <option *ngFor="let consultant of consultants" [value]="consultant.fullName">{{ consultant.fullName }}</option>
              </select>
            </div>
          </div>

          <div class="generator-grid-4">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Mês Ref.</label>
              <input type="number" [(ngModel)]="params.refMonth" (ngModelChange)="calculateInvoice()" class="form-control" placeholder="Mês (1-12)">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Ano Ref.</label>
              <input type="number" [(ngModel)]="params.refYear" (ngModelChange)="calculateInvoice()" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Vencimento</label>
              <input type="date" [ngModel]="formattedDueDate" (ngModelChange)="onDueDateChange($event)" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Creditado (R$)</label>
              <input type="number" [(ngModel)]="params.creditedAmount" (ngModelChange)="calculateInvoice()" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Pendências (R$)</label>
              <input type="number" [(ngModel)]="params.lastMontyPendencies" (ngModelChange)="calculateInvoice()" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Abatimento (R$)</label>
              <input type="number" [(ngModel)]="params.deduction" (ngModelChange)="calculateInvoice()" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Nº Fatura</label>
              <input type="number" [(ngModel)]="invoice.number" class="form-control">
            </div>
          </div>

          <div class="generator-actions">
            <button (click)="calculateInvoice()" class="btn btn-secondary">Recalcular</button>
          </div>
        </div>

        <div style="margin-top: 3rem;">
           <app-invoice-preview [invoice]="invoice" (onGenerated)="updateNextInvoiceNumber()"></app-invoice-preview>
        </div>
      </section>
    </main>
  `,
  styleUrls: ['../../app.component.scss', '../../management/management.css', './invoice-generator.component.scss']
})
export class InvoiceGeneratorComponent implements OnInit {
  invoice: Invoice = new Invoice();
  params: InvoiceItemsConfigParams = new InvoiceItemsConfigParams();
  clients: any[] = [];
  consultants: any[] = [];

  constructor(
    private clientRepo: IndexedDbClientRepository,
    private consultantRepo: IndexedDbConsultantRepository,
    private invoiceRepo: IndexedDbInvoiceRepository,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0 = January
    this.params.refMonth = currentMonth === 0 ? 12 : currentMonth;
    this.params.refYear = currentMonth === 0 ? today.getFullYear() - 1 : today.getFullYear();
    
    // Default due date: 10th of current month
    this.invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), 10);
  }

  ngOnInit() {
    this.clientRepo.getAll().subscribe(data => this.clients = data);
    this.consultantRepo.getAll().subscribe(data => {
      this.consultants = data;
      // Auto-select first consultant if available
      if (this.consultants.length > 0 && !this.invoice.consultant.firstName) {
        this.invoice.consultant = this.consultants[0];
      }
    });
    
    this.updateNextInvoiceNumber();

    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['fromHistory']) {
        this.invoiceRepo.getById(queryParams['fromHistory']).subscribe(inv => {
          if (inv) this.invoice = inv;
        });
      }
    });
  }

  onClientSelect(event: any) {
    const name = event.target.value;
    if (name) {
      this.clientRepo.getById(name).subscribe(client => {
        if (client) {
          this.invoice.client = client;
          this.params.montlyFee = client.monthlyFee;
          this.params.previousMontlyFee = client.previousMontlyFee;
          this.params.commission = client.commission;
          this.params.annualMonthlyFeeAdjustment = client.annualMonthlyFeeAdjustment;
          
          this.calculateInvoice(); // Auto-calculate on selection
        }
      });
    }
  }

  onConsultantSelect(event: any) {
    const name = event.target.value;
    if (name) {
      this.consultantRepo.getById(name).subscribe(consultant => {
        if (consultant) this.invoice.consultant = consultant;
      });
    }
  }

  calculateInvoice() {
    if (!this.invoice.client.name) {
      alert('O campo Cliente é obrigatório!');
      return;
    }

    if (!this.invoice.consultant.fullName) {
      alert('O campo Consultor é obrigatório!');
      return;
    }

    if (!this.params.refMonth || !this.params.refYear) {
      alert('Os campos de Mês e Ano de referência são obrigatórios!');
      return;
    }

    if (!this.invoice.dueDate) {
      alert('O campo Data de Vencimento é obrigatório!');
      return;
    }

    if (this.params.creditedAmount === null || this.params.creditedAmount === undefined) {
      alert('O campo Valor Creditado é obrigatório!');
      return;
    }

    if (!this.invoice.number) {
      alert('O campo Número da Fatura é obrigatório!');
      return;
    }

    this.invoiceRepo.getAll().subscribe(history => {
      const exists = history.some(inv => inv.number === this.invoice.number);
      if (exists) {
        alert(`O número de fatura #${this.invoice.number} já existe no histórico. Use um número diferente.`);
        return;
      }

      // Set reference from params to invoice
      this.invoice.referenceMonth = this.params.refMonth;
      this.invoice.referenceYear = this.params.refYear;
      
      const config = new InvoiceItemsConfig(this.params);
      this.invoice.services = config.services;
      
      // Auto-update due date to 10th if it's still default or month changed
      const currentDue = this.invoice.dueDate;
      if (currentDue.getDate() === 10 || currentDue.getMonth() !== (this.params.refMonth - 1)) {
          this.invoice.dueDate = new Date(this.params.refYear, this.params.refMonth - 1, 10);
      }

      console.log('Invoice items calculated', this.invoice.services);
    });
  }

  get formattedDueDate(): string {
    if (!this.invoice || !this.invoice.dueDate) return '';
    const d = this.invoice.dueDate;
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

  onDueDateChange(value: any) {
    if (value && typeof value === 'string') {
      this.invoice.dueDate = new Date(value + 'T00:00:00');
    } else if (value && value.target && value.target.value) {
      this.invoice.dueDate = new Date(value.target.value + 'T00:00:00');
    }
  }

  public updateNextInvoiceNumber() {
    this.invoiceRepo.getAll().subscribe(history => {
      if (history.length > 0) {
        const maxNumber = Math.max(...history.map(inv => inv.number || 0));
        this.invoice.number = Math.max(maxNumber + 1, 100300);
      } else {
        this.invoice.number = 100300;
      }
    });
  }
}
