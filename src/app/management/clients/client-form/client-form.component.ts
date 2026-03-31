import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../classes/client.class';
import { LocalStorageClientRepository } from '../../../services/repositories/local-storage-client.repository';

@Component({
  selector: 'app-client-form',
  template: `
    <div class="management-container">
      <h2>{{ isEdit ? 'Editar Cliente' : 'Novo Cliente' }}</h2>

      <form (ngSubmit)="saveClient()">
        <div class="form-group">
          <label>Nome do Cliente</label>
          <input type="text" [(ngModel)]="client.name" name="name" class="form-control" placeholder="Ex: JF Limpeza" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="client.email" name="email" class="form-control" placeholder="Ex: contato@empresa.com">
        </div>

        <div class="form-group">
          <label>Representante da Empresa</label>
          <input type="text" [(ngModel)]="client.companyRepresentativeName" name="rep" class="form-control" placeholder="Ex: João da Silva">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label>Mensalidade Atual (R$)</label>
            <input type="number" [(ngModel)]="client.monthlyFee" name="fee" class="form-control">
          </div>

          <div class="form-group">
            <label>Mensalidade Anterior (R$)</label>
            <input type="number" [(ngModel)]="client.previousMontlyFee" name="prevFee" class="form-control">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label>Comissão (%)</label>
            <input type="number" [(ngModel)]="client.commission" name="commission" class="form-control">
          </div>

          <div class="form-group">
            <label>Ajuste Fixo Anual (R$)</label>
            <input type="number" [(ngModel)]="client.annualMonthlyFeeAdjustment" name="adjustment" class="form-control">
          </div>
        </div>

        <div class="action-bar" style="margin-top: 2rem; gap: 1rem;">
          <button type="button" routerLink="/management/clients" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary">{{ isEdit ? 'Salvar Alterações' : 'Criar Cliente' }}</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['../../management.css']
})
export class ClientFormComponent implements OnInit {
  client: Client = new Client();
  isEdit: boolean = false;

  constructor(
    private clientRepo: LocalStorageClientRepository,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.clientRepo.getById(id).subscribe(data => {
        if (data) this.client = data;
      });
    }
  }

  saveClient(): void {
    if (!this.client.name) {
      alert('Nome do cliente é obrigatório!');
      return;
    }
    this.clientRepo.save(this.client).subscribe(() => {
      this.router.navigate(['/management/clients']);
    });
  }
}
