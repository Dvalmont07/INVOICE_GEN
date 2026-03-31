import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../classes/invoice.class';
// import { INVOICE } from '../../data/private/private-jflimpeza/invoice.data';
import { LocalStorageClientRepository } from '../../services/repositories/local-storage-client.repository';
import { LocalStorageConsultantRepository } from '../../services/repositories/local-storage-consultant.repository';

@Component({
  selector: 'app-invoice-generator',
  template: `
    <main>
      <section class="invoice-container">
        <div class="selection-panel" style="margin-bottom: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #1a2a6c;">Gerar Nova Fatura</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label>Selecionar Cliente</label>
              <select (change)="onClientSelect($event)" class="form-control">
                <option value="">Selecione um cliente...</option>
                <option *ngFor="let client of clients" [value]="client.name">{{ client.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Selecionar Consultor</label>
              <select (change)="onConsultantSelect($event)" class="form-control">
                <option value="">Selecione um consultor...</option>
                <option *ngFor="let consultant of consultants" [value]="consultant.fullName">{{ consultant.fullName }}</option>
              </select>
            </div>
          </div>
        </div>

        <app-invoice-preview [invoice]="invoice"></app-invoice-preview>
      </section>
    </main>
  `,
  styleUrls: ['../../app.component.scss']
})
export class InvoiceGeneratorComponent implements OnInit {
  invoice: Invoice = new Invoice();
  clients: any[] = [];
  consultants: any[] = [];

  constructor(
    private clientRepo: LocalStorageClientRepository,
    private consultantRepo: LocalStorageConsultantRepository
  ) {}

  ngOnInit() {
    // Load from repositories
    this.clientRepo.getAll().subscribe(data => this.clients = data);
    this.consultantRepo.getAll().subscribe(data => this.consultants = data);
    
    // Set some defaults or leave empty
  }

  onClientSelect(event: any) {
    const name = event.target.value;
    if (name) {
      this.clientRepo.getById(name).subscribe(client => {
        if (client) this.invoice.client = client;
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
}
