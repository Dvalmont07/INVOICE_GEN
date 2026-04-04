import { Injectable } from '@angular/core';
import { Client } from '../classes/client.class';
import { Consultant } from '../classes/consultant.class';
import { IndexedDbClientRepository } from './repositories/indexed-db-client.repository';
import { IndexedDbConsultantRepository } from './repositories/indexed-db-consultant.repository';
import { forkJoin, of, switchMap, take } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSeederService {
  constructor(
    private clientRepo: IndexedDbClientRepository,
    private consultantRepo: IndexedDbConsultantRepository
  ) {}

  /**
   * Used by APP_INITIALIZER - returns a Promise so Angular waits for seeding
   * to complete BEFORE any component is created. This eliminates the race condition
   * where components rendered before async seeding finished.
   */
  initializeDatabase(): Promise<void> {
    return firstValueFrom(
      forkJoin({
        clients: this.clientRepo.getAll(true).pipe(take(1)),
        consultants: this.consultantRepo.getAll(true).pipe(take(1))
      }).pipe(
        switchMap(({ clients, consultants }) => {
          const tasks: any[] = [];

          if (clients.length === 0) {
            console.log('[Seeder] No clients found, seeding...');
            const initialClients = this.buildInitialClients();
            tasks.push(...initialClients.map(c => this.clientRepo.save(c)));
          } else {
            console.log(`[Seeder] Found ${clients.length} clients, skipping client seed.`);
          }

          if (consultants.length === 0) {
            console.log('[Seeder] No consultants found, seeding...');
            tasks.push(this.consultantRepo.save(this.buildInitialConsultant()));
          } else {
            console.log(`[Seeder] Found ${consultants.length} consultants, skipping consultant seed.`);
          }

          return tasks.length > 0 ? forkJoin(tasks) : of(null);
        })
      )
    ).then(
      () => { console.log('[Seeder] Database initialization complete.'); },
      (err) => { console.error('[Seeder] Error during initialization:', err); }
    );
  }

  /** @deprecated use initializeDatabase() */
  seed(): void {
    this.initializeDatabase();
  }

  private buildInitialClients(): Client[] {
    return [
      this.createClient('Art-Brilho', 'Solange/Priscila', 'contato@artbrilholimpeza.com.br', 329.02, 343.04, 20, 4.26),
      this.createClient('E&S Limpeza Especializada', 'Silvio', 'contato@eslimpezaespecializada.com.br', 209.24, 209.24, 17.5, 0),
      this.createClient('JF Limpeza Pesada', 'Fernando/Fernanda', 'contato@jflimpezapesada.com.br', 282.52, 294.55, 17.5, 4.26)
    ];
  }

  private buildInitialConsultant(): Consultant {
    const consultant = new Consultant();
    consultant.firstName = 'Danilo';
    consultant.lastName = 'de Jesus Matos';
    consultant.email = 'danilo.dejesusmatos@gmail.com';
    consultant.bankName = 'Inter';
    consultant.pixKey = '11983706173';
    consultant.companyName = 'Danilo Matos';
    consultant.signature = '/assets/image/private/assinatura-rubrica-sm.png';
    return consultant;
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
