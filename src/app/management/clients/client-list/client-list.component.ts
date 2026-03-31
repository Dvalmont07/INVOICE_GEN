import { Component, OnInit } from '@angular/core';
import { Client } from '../../../classes/client.class';
import { LocalStorageClientRepository } from '../../../services/repositories/local-storage-client.repository';

@Component({
  selector: 'app-client-list',
  template: `
    <div class="management-container">
      <h2>
        Clientes
        <a routerLink="/management/clients/new" class="btn btn-primary">Novo Cliente</a>
      </h2>

      <div *ngIf="clients.length === 0" class="empty-state">
        <i>👥</i>
        <p>Nenhum cliente cadastrado ainda.</p>
      </div>

      <table *ngIf="clients.length > 0" class="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Mensalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let client of clients">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.monthlyFee | currency:'BRL' }}</td>
            <td>
              <div style="display: flex; gap: 0.5rem;">
                <a [routerLink]="['/management/clients/edit', client.name]" class="btn btn-secondary">Editar</a>
                <button (click)="deleteClient(client.name)" class="btn btn-danger">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../../management.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientRepo: LocalStorageClientRepository) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientRepo.getAll().subscribe(data => this.clients = data);
  }

  deleteClient(name: string): void {
    if (confirm(`Tem certeza que deseja excluir o cliente ${name}?`)) {
      this.clientRepo.delete(name).subscribe(() => this.loadClients());
    }
  }
}
