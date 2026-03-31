import { DEFAULT_CURRENCY_CODE,  LOCALE_ID,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicePreviewComponent } from './invoice/invoice-preview/invoice-preview.component';
import { FormsModule, NgForm } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ClientListComponent } from './management/clients/client-list/client-list.component';
import { ClientFormComponent } from './management/clients/client-form/client-form.component';
import { ConsultantListComponent } from './management/consultants/consultant-list/consultant-list.component';
import { ConsultantFormComponent } from './management/consultants/consultant-form/consultant-form.component';
import { LocalStorageClientRepository } from './services/repositories/local-storage-client.repository';
import { LocalStorageConsultantRepository } from './services/repositories/local-storage-consultant.repository';
import { InvoiceGeneratorComponent } from './invoice/invoice-generator/invoice-generator.component';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    InvoicePreviewComponent,
    InvoiceGeneratorComponent,
    ClientListComponent,
    ClientFormComponent,
    ConsultantListComponent,
    ConsultantFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }