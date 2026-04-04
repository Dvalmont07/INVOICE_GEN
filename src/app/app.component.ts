import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatabaseSyncService } from './services/database-sync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INVOICE_GEN';
  mobileMenuOpen = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private syncService: DatabaseSyncService) {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  exportBackup() {
    this.syncService.downloadBackupFile();
    alert('Backup exportado com sucesso!');
  }

  triggerImport() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const json = e.target.result;
        this.syncService.importDatabase(json).subscribe(success => {
          if (success) {
            alert('Banco de dados importado com sucesso! A página será atualizada.');
            window.location.reload();
          } else {
            alert('Erro ao importar. Verifique se o arquivo JSON é válido.');
          }
        });
      };
      reader.readAsText(file);
    }
    // Reset the input so the same file can be selected again
    event.target.value = null;
  }
}
