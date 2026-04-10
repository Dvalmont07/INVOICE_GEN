import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../classes/invoice.class';
import { InvoiceItemsConfigParams } from '../../classes/invoice-items-config-params.class';
import { InvoiceItemsConfig } from '../../classes/invoice-items-config.class';
import { InvoiceItems } from '../../classes/invoice-items.class';
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
        <div class="card">
          <header class="card-header">
            <h3>Configuração da Fatura</h3>
          </header>
          
          <div class="generator-grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Cliente</label>
              <select #clientSelect [(ngModel)]="invoice.client.name" (change)="onClientSelect($event)" class="form-control">
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
      </section>

      <section style="margin-top: 2rem;">
        <div class="card">
          <header class="card-header">
            <h3>Itens Adicionais</h3>
          </header>
          
          <div class="generator-grid-4" style="grid-template-columns: 2fr 1fr 1fr 100px; padding-top: 2rem; padding-bottom: 2rem; background: #F8FAFC; border-top: 1px solid var(--brand-border); border-bottom: 1px solid var(--brand-border);">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Descrição</label>
              <input type="text" [(ngModel)]="newCustomItem.description" class="form-control" placeholder="Ex: Hora extra...">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Quantidade</label>
              <input type="number" [(ngModel)]="newCustomItem.quantity" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="generator-label">Valor Unit. (R$)</label>
              <input type="number" [(ngModel)]="newCustomItem.price" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 0; display: flex; align-items: flex-end;">
              <button (click)="addCustomItem()" class="btn btn-primary" style="width: 100%; height: 42px; font-weight: 600;">ADD</button>
            </div>
          </div>

          <div *ngIf="params.customItems.length > 0" class="custom-items-list" style="padding: 1.5rem 2rem 2rem 2rem;">
            <table class="table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
              <thead>
                <tr style="text-align: left; border-bottom: 2px solid #eee;">
                  <th style="padding: 12px 8px; color: var(--brand-slate); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Descrição</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--brand-slate); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Qtd</th>
                  <th style="padding: 12px 8px; text-align: right; color: var(--brand-slate); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Unitário</th>
                  <th style="padding: 12px 8px; text-align: right; color: var(--brand-slate); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Total</th>
                  <th style="padding: 12px 8px;"></th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of params.customItems; let i = index" style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px 8px; font-weight: 500;">{{ item.description }}</td>
                  <td style="padding: 12px 8px; text-align: center;">{{ item.quantity }}</td>
                  <td style="padding: 12px 8px; text-align: right;">{{ item.price | currency:'BRL' }}</td>
                  <td style="padding: 12px 8px; text-align: right; font-weight: 600;">{{ item.total | currency:'BRL' }}</td>
                  <td style="padding: 12px 8px; text-align: right;">
                    <button (click)="removeCustomItem(i)" class="btn btn-danger" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">Remover</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style="margin-top: 3rem;">
        <app-invoice-preview [invoice]="invoice" (onGenerated)="updateNextInvoiceNumber()"></app-invoice-preview>
      </section>
    </main>
  `,
  styleUrls: ['../../app.component.scss', '../../management/management.css', './invoice-generator.component.scss']
})
export class InvoiceGeneratorComponent implements OnInit, AfterViewInit {
  @ViewChild('clientSelect') clientSelect!: ElementRef;

  invoice: Invoice = new Invoice();
  params: InvoiceItemsConfigParams = new InvoiceItemsConfigParams();
  clients: any[] = [];
  consultants: any[] = [];

  newCustomItem: InvoiceItems = new InvoiceItems('', 1, 0);

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

  ngAfterViewInit() {
    this.focusClientSelect();
  }

  private focusClientSelect() {
    if (this.clientSelect) {
      setTimeout(() => {
        this.clientSelect.nativeElement.focus();
      }, 0);
    }
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

  addCustomItem() {
    if (!this.newCustomItem.description || this.newCustomItem.price <= 0) {
      alert('Descrição e preço são obrigatórios para itens customizados!');
      return;
    }

    this.params.customItems.push(new InvoiceItems(
      this.newCustomItem.description,
      this.newCustomItem.quantity,
      this.newCustomItem.price
    ));

    // Reset form
    this.newCustomItem = new InvoiceItems('', 1, 0);
    
    // Auto-recalculate
    if (this.invoice.client.name) {
      this.calculateInvoice();
    }
  }

  removeCustomItem(index: number) {
    this.params.customItems.splice(index, 1);
    this.calculateInvoice();
  }

  public updateNextInvoiceNumber() {
    this.invoiceRepo.getAll().subscribe(history => {
      if (history.length > 0) {
        const maxNumber = Math.max(...history.map(inv => inv.number || 0));
        this.invoice.number = Math.max(maxNumber + 1, 100300);
      } else {
        this.invoice.number = 100300;
      }
      this.focusClientSelect();
    });
  }
}
