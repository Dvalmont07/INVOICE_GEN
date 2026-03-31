import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../classes/invoice.class';
import { InvoiceItemsConfigParams } from '../../classes/invoice-items-config-params.class';
import { InvoiceItemsConfig } from '../../classes/invoice-items-config.class';
import { LocalStorageClientRepository } from '../../services/repositories/local-storage-client.repository';
import { LocalStorageConsultantRepository } from '../../services/repositories/local-storage-consultant.repository';
import { LocalStorageInvoiceRepository } from '../../services/repositories/local-storage-invoice.repository';

@Component({
  selector: 'app-invoice-generator',
  template: `
    <main>
      <section class="invoice-container">
        <div class="selection-panel" style="margin-bottom: 2rem; padding: 2rem; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h3 style="margin-top: 0; color: #1a2a6c; border-bottom: 2px solid #edf2f7; padding-bottom: 1rem; margin-bottom: 1.5rem;">Configuração da Fatura</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
            <div class="form-group">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Selecionar Cliente</label>
              <select (change)="onClientSelect($event)" class="form-control" [value]="invoice.client.name">
                <option value="">Selecione um cliente...</option>
                <option *ngFor="let client of clients" [value]="client.name">{{ client.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Selecionar Consultor</label>
              <select (change)="onConsultantSelect($event)" class="form-control" [value]="invoice.consultant.fullName">
                <option value="">Selecione um consultor...</option>
                <option *ngFor="let consultant of consultants" [value]="consultant.fullName">{{ consultant.fullName }}</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div class="form-group">
              <label style="font-size: 0.85rem;">Mês Referência</label>
              <input type="number" [(ngModel)]="params.refMonth" class="form-control" placeholder="Mês (1-12)">
            </div>
            <div class="form-group">
              <label style="font-size: 0.85rem;">Ano Referência</label>
              <input type="number" [(ngModel)]="params.refYear" class="form-control">
            </div>
            <div class="form-group">
              <label style="font-size: 0.85rem;">Valor Creditado (R$)</label>
              <input type="number" [(ngModel)]="params.creditedAmount" class="form-control">
            </div>
            <div class="form-group">
              <label style="font-size: 0.85rem;">Pendências (R$)</label>
              <input type="number" [(ngModel)]="params.lastMontyPendencies" class="form-control">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
            <button (click)="calculateInvoice()" class="btn btn-secondary">Calcular Itens</button>
            <button (click)="saveToHistory()" class="btn btn-primary">Salvar no Histórico</button>
          </div>
        </div>

        <app-invoice-preview [invoice]="invoice"></app-invoice-preview>
      </section>
    </main>
  `,
  styleUrls: ['../../app.component.scss', '../../management/management.css']
})
export class InvoiceGeneratorComponent implements OnInit {
  invoice: Invoice = new Invoice();
  params: InvoiceItemsConfigParams = new InvoiceItemsConfigParams();
  clients: any[] = [];
  consultants: any[] = [];

  constructor(
    private clientRepo: LocalStorageClientRepository,
    private consultantRepo: LocalStorageConsultantRepository,
    private invoiceRepo: LocalStorageInvoiceRepository,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.params.refMonth = today.getMonth() + 1;
    this.params.refYear = today.getFullYear();
  }

  ngOnInit() {
    this.clientRepo.getAll().subscribe(data => this.clients = data);
    this.consultantRepo.getAll().subscribe(data => this.consultants = data);

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
      alert('Selecione um cliente primeiro!');
      return;
    }
    
    // Set reference from params to invoice
    this.invoice.referenceMonth = this.params.refMonth;
    this.invoice.referenceYear = this.params.refYear;
    
    const config = new InvoiceItemsConfig(this.params);
    this.invoice.services = config.services;
    
    // Auto-update due date to 5th of current month
    const dueDate = new Date();
    dueDate.setDate(5);
    this.invoice.dueDate = dueDate;

    console.log('Invoice items calculated', this.invoice.services);
  }

  saveToHistory() {
    if (this.invoice.services.length === 0) {
      alert('Calcule os itens antes de salvar!');
      return;
    }
    this.invoice.id = new Date().getTime().toString();
    this.invoiceRepo.save(this.invoice).subscribe(() => {
      alert('Fatura salva no histórico com sucesso!');
    });
  }
}
