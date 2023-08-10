import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicePreviewComponent } from './invoice/invoice-preview/invoice-preview.component';
import { FormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConsultantComponent } from './components/consultant/consultant.component';
import { ClientComponent } from './components/client/client.component';
// import appRoutes from './routerConfig_old';


registerLocaleData(ptBr);
@NgModule({
  declarations: [		
    AppComponent,
    InvoicePreviewComponent,
      ConsultantComponent,
      ClientComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    


  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }