import { Injectable } from '@angular/core';

export interface AppDatabaseBackup {
  clients: any;
  consultants: any;
  invoices: any;
  version: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseSyncService {
  private readonly CLIENTS_KEY = 'invoice_gen_clients';
  private readonly CONSULTANTS_KEY = 'invoice_gen_consultants';
  private readonly INVOICES_KEY = 'invoice_gen_history';
  private readonly CURRENT_VERSION = '1.0.0';

  constructor() {}

  /**
   * Exporta os dados atuais do LocalStorage para uma string JSON
   */
  public exportDatabase(): string {
    const clientsStr = localStorage.getItem(this.CLIENTS_KEY);
    const consultantsStr = localStorage.getItem(this.CONSULTANTS_KEY);
    const invoicesStr = localStorage.getItem(this.INVOICES_KEY);

    const backup: AppDatabaseBackup = {
      clients: clientsStr ? JSON.parse(clientsStr) : [],
      consultants: consultantsStr ? JSON.parse(consultantsStr) : [],
      invoices: invoicesStr ? JSON.parse(invoicesStr) : [],
      version: this.CURRENT_VERSION,
      timestamp: new Date().toISOString()
    };

    return JSON.stringify(backup, null, 2);
  }

  /**
   * Dispara o download em tela do banco de dados completo
   */
  public downloadBackupFile(): void {
    const backupJson = this.exportDatabase();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoicegen_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    window.URL.revokeObjectURL(url);
  }

  /**
   * Importa um backup JSON e mescla à base local, garantindo não ter chaves vazias.
   */
  public importDatabase(backupJson: string): boolean {
    try {
      const backup: AppDatabaseBackup = JSON.parse(backupJson);

      if (!backup.version || !backup.timestamp) {
        throw new Error('Arquivo de backup inválido ou incompatível.');
      }

      if (backup.clients && backup.clients.length >= 0) {
        localStorage.setItem(this.CLIENTS_KEY, JSON.stringify(backup.clients));
      }
      
      if (backup.consultants && backup.consultants.length >= 0) {
        localStorage.setItem(this.CONSULTANTS_KEY, JSON.stringify(backup.consultants));
      }

      if (backup.invoices && backup.invoices.length >= 0) {
        localStorage.setItem(this.INVOICES_KEY, JSON.stringify(backup.invoices));
      }

      return true;
    } catch (e) {
      console.error('Erro ao importar o banco de dados', e);
      return false;
    }
  }
}
