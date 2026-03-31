import { Component, OnInit } from '@angular/core';
import { Consultant } from '../../../classes/consultant.class';
import { LocalStorageConsultantRepository } from '../../../services/repositories/local-storage-consultant.repository';

@Component({
  selector: 'app-consultant-list',
  template: `
    <div class="management-container">
      <h2>
        Consultores
        <a routerLink="/management/consultants/new" class="btn btn-primary">Novo Consultor</a>
      </h2>

      <div *ngIf="consultants.length === 0" class="empty-state">
        <i>👔</i>
        <p>Nenhum consultor cadastrado ainda.</p>
      </div>

      <table *ngIf="consultants.length > 0" class="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Empresa</th>
            <th>Email</th>
            <th>Chave PIX</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let consultant of consultants">
            <td>{{ consultant.fullName }}</td>
            <td>{{ consultant.companyName }}</td>
            <td>{{ consultant.email }}</td>
            <td>{{ consultant.pixKey }}</td>
            <td>
              <div style="display: flex; gap: 0.5rem;">
                <a [routerLink]="['/management/consultants/edit', consultant.fullName]" class="btn btn-secondary">Editar</a>
                <button (click)="deleteConsultant(consultant.fullName)" class="btn btn-danger">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../../management.css']
})
export class ConsultantListComponent implements OnInit {
  consultants: Consultant[] = [];

  constructor(private consultantRepo: LocalStorageConsultantRepository) {}

  ngOnInit(): void {
    this.loadConsultants();
  }

  loadConsultants(): void {
    this.consultantRepo.getAll().subscribe(data => this.consultants = data);
  }

  deleteConsultant(id: string): void {
    if (confirm(`Tem certeza que deseja excluir o consultor ${id}?`)) {
      this.consultantRepo.delete(id).subscribe(() => this.loadConsultants());
    }
  }
}
