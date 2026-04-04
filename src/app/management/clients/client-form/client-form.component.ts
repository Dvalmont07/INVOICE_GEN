import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../classes/client.class';
import { IndexedDbClientRepository } from '../../../services/repositories/indexed-db-client.repository';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['../../management.css']
})
export class ClientFormComponent implements OnInit {
  client: Client = new Client();
  isEdit: boolean = false;

  constructor(
    private clientRepo: IndexedDbClientRepository,
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
