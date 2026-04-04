import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatabaseSeederService } from './services/database-seeder.service';
import { DatabaseSyncService } from './services/database-sync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'INVOICE_GEN';
  mobileMenuOpen = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private seeder: DatabaseSeederService,
    private syncService: DatabaseSyncService
  ) {}

  ngOnInit() {
    this.seeder.seed();
  }

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
        const success = this.syncService.importDatabase(json);
        if (success) {
          alert('Banco de dados importado com sucesso! A página será atualizada.');
          window.location.reload();
        } else {
          alert('Erro ao importar. Verifique se o arquivo JSON é válido.');
        }
      };
      reader.readAsText(file);
    }
    // Reset the input so the same file can be selected again
    event.target.value = null;
  }
}
