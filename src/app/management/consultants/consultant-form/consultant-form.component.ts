import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from '../../../classes/consultant.class';
import { LocalStorageConsultantRepository } from '../../../services/repositories/local-storage-consultant.repository';

@Component({
  selector: 'app-consultant-form',
  template: `
    <div class="management-container">
      <h2>{{ isEdit ? 'Editar Consultor' : 'Novo Consultor' }}</h2>

      <form (ngSubmit)="saveConsultant()">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label>Primeiro Nome</label>
            <input type="text" [(ngModel)]="consultant.firstName" name="firstName" class="form-control" required placeholder="Ex: Danilo">
          </div>
          <div class="form-group">
            <label>Sobrenome</label>
            <input type="text" [(ngModel)]="consultant.lastName" name="lastName" class="form-control" required placeholder="Ex: Matos">
          </div>
        </div>

        <div class="form-group">
          <label>Nome da Empresa (Sua Empresa)</label>
          <input type="text" [(ngModel)]="consultant.companyName" name="companyName" class="form-control" placeholder="Ex: Danilo Consultoria LTDA">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label>Chave PIX</label>
            <input type="text" [(ngModel)]="consultant.pixKey" name="pixKey" class="form-control" placeholder="Ex: seu@email.com">
          </div>
          <div class="form-group">
            <label>Nome do Banco</label>
            <input type="text" [(ngModel)]="consultant.bankName" name="bankName" class="form-control" placeholder="Ex: Nubank">
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="consultant.email" name="email" class="form-control" placeholder="Ex: danilo@email.com">
        </div>

        <div class="form-group">
          <label>Assinatura (Texto ou Carimbo)</label>
          <input type="text" [(ngModel)]="consultant.signature" name="signature" class="form-control" placeholder="Ex: Danilo Matos">
        </div>

        <div class="action-bar" style="margin-top: 2rem; gap: 1rem;">
          <button type="button" routerLink="/management/consultants" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary">{{ isEdit ? 'Salvar Alterações' : 'Criar Consultor' }}</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['../../management.css']
})
export class ConsultantFormComponent implements OnInit {
  consultant: Consultant = new Consultant();
  isEdit: boolean = false;

  constructor(
    private consultantRepo: LocalStorageConsultantRepository,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.consultantRepo.getById(id).subscribe(data => {
        if (data) this.consultant = data;
      });
    }
  }

  saveConsultant(): void {
    if (!this.consultant.firstName || !this.consultant.lastName) {
      alert('Nome e sobrenome são obrigatórios!');
      return;
    }
    this.consultantRepo.save(this.consultant).subscribe(() => {
      this.router.navigate(['/management/consultants']);
    });
  }
}
