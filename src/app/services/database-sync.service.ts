import { Injectable } from '@angular/core';
import { IndexedDbClientRepository } from './repositories/indexed-db-client.repository';
import { IndexedDbConsultantRepository } from './repositories/indexed-db-consultant.repository';
import { IndexedDbInvoiceRepository } from './repositories/indexed-db-invoice.repository';
import { forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { Client } from '../classes/client.class';
import { Consultant } from '../classes/consultant.class';
import { Invoice } from '../classes/invoice.class';

export interface AppDatabaseBackup {
  clients: any[];
  consultants: any[];
  invoices: any[];
  version: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseSyncService {
  private readonly CURRENT_VERSION = '2.0.0'; // Updated version for IndexedDB

  constructor(
    private clientRepo: IndexedDbClientRepository,
    private consultantRepo: IndexedDbConsultantRepository,
    private invoiceRepo: IndexedDbInvoiceRepository
  ) {}

  /**
   * Exporta os dados atuais de todos os repositórios para uma string JSON
   */
  public exportDatabase(): Observable<string> {
    return forkJoin({
      clients: this.clientRepo.getAll().pipe(take(1)),
      consultants: this.consultantRepo.getAll().pipe(take(1)),
      invoices: this.invoiceRepo.getAll().pipe(take(1))
    }).pipe(
      map(({ clients, consultants, invoices }) => {
        const backup: AppDatabaseBackup = {
          clients: clients.map(c => c.toJSON()),
          consultants: consultants.map(c => c.toJSON()),
          invoices: invoices.map(i => i.toJSON()),
          version: this.CURRENT_VERSION,
          timestamp: new Date().toISOString()
        };
        return JSON.stringify(backup, null, 2);
      })
    );
  }

  /**
   * Dispara o download em tela do banco de dados completo
   */
  public downloadBackupFile(): void {
    this.exportDatabase().subscribe(backupJson => {
      const blob = new Blob([backupJson], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoicegen_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      window.URL.revokeObjectURL(url);
    });
  }

  /**
   * Importa um backup JSON e salva nos repositórios seguindo a separação de interesses.
   */
  public importDatabase(backupJson: string): Observable<boolean> {
    try {
      const backup: AppDatabaseBackup = JSON.parse(backupJson);

      if (!backup.version || !backup.timestamp) {
        throw new Error('Arquivo de backup inválido ou incompatível.');
      }

      // We use forkJoin and switchMap to save all items one by one or in bulk if repository allowed
      // For now, we save everything sequentially/in parallel using forkJoin
      const clientObs = (backup.clients || []).map(c => this.clientRepo.save(Client.fromJSON(c)));
      const consultantObs = (backup.consultants || []).map(c => this.consultantRepo.save(Consultant.fromJSON(c)));
      const invoiceObs = (backup.invoices || []).map(i => this.invoiceRepo.save(Invoice.fromJSON(i)));

      const allObs = [...clientObs, ...consultantObs, ...invoiceObs];
      
      if (allObs.length === 0) return of(true);

      return forkJoin(allObs).pipe(
        map(() => true),
        take(1)
      );
    } catch (e) {
      console.error('Erro ao importar o banco de dados', e);
      return of(false);
    }
  }
}
