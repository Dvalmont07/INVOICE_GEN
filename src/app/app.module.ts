import { CSP_NONCE, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicePreviewComponent } from './invoice/invoice-preview/invoice-preview.component';
import { FormsModule, NgForm } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    InvoicePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    // {
    //   provide: CSP_NONCE,
    //   useValue: 'DVA_NOEC'
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }