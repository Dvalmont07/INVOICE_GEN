import { Injectable } from '@angular/core';
import { Client } from '../classes/client.class';
import { Consultant } from '../classes/consultant.class';
import { LocalStorageClientRepository } from './repositories/local-storage-client.repository';
import { LocalStorageConsultantRepository } from './repositories/local-storage-consultant.repository';
import { forkJoin, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSeederService {
  constructor(
    private clientRepo: LocalStorageClientRepository,
    private consultantRepo: LocalStorageConsultantRepository
  ) {}

  seed(): void {
    // Only seed if both are empty
    forkJoin({
      clients: this.clientRepo.getAll().pipe(take(1)),
      consultants: this.consultantRepo.getAll().pipe(take(1))
    }).subscribe(({ clients, consultants }) => {
      if (clients.length === 0) {
        this.seedClients();
      }
      if (consultants.length === 0) {
        this.seedConsultants();
      }
    });
  }

  private seedClients(): void {
    const initialClients: Client[] = [
      this.createClient("Art-Brilho", "Solange/Priscila", "contato@artbrilholimpeza.com.br", 329.02, 343.04, 20, 4.26),
      this.createClient("E&S Limpeza Especializada", "Silvio", "contato@eslimpezaespecializada.com.br", 209.24, 209.24, 17.5, 0),
      this.createClient("JF Limpeza Pesada", "Fernando/Fernanda", "contato@jflimpezapesada.com.br", 282.52, 294.55, 17.5, 4.26)
    ];

    initialClients.forEach(client => this.clientRepo.save(client).subscribe());
    console.log('Seeded initial clients');
  }

  private seedConsultants(): void {
    const consultant = new Consultant();
    consultant.firstName = "Danilo";
    consultant.lastName = "de Jesus Matos";
    consultant.email = "danilo.dejesusmatos@gmail.com";
    consultant.bankName = "Inter";
    consultant.pixKey = "11983706173";
    consultant.companyName = "Danilo Matos";
    consultant.signature = "/assets/image/private/assinatura-rubrica-sm.png";

    this.consultantRepo.save(consultant).subscribe();
    console.log('Seeded initial consultant');
  }

  private createClient(name: string, rep: string, email: string, prevFee: number, currentFee: number, commission: number, adj: number): Client {
    const client = new Client();
    client.name = name;
    client.companyRepresentativeName = rep;
    client.email = email;
    client.previousMontlyFee = prevFee;
    client.monthlyFee = currentFee;
    client.commission = commission;
    client.annualMonthlyFeeAdjustment = adj;
    return client;
  }
}
