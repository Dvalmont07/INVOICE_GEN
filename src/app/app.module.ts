import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicePreviewComponent } from './invoice/invoice-preview/invoice-preview.component';
import { FormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConsultantComponent } from './consultant/consultant.component';
import { ClientComponent } from './client/client.component';
import { RouterModule } from '@angular/router';
import appRoutes from './routerConfig';


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
    RouterModule.forRoot(appRoutes),
    


  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }