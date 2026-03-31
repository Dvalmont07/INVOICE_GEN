import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './management/clients/client-list/client-list.component';
import { ClientFormComponent } from './management/clients/client-form/client-form.component';
import { ConsultantListComponent } from './management/consultants/consultant-list/consultant-list.component';
import { ConsultantFormComponent } from './management/consultants/consultant-form/consultant-form.component';
import { InvoiceHistoryComponent } from './management/invoices/invoice-history/invoice-history.component';
import { InvoiceGeneratorComponent } from './invoice/invoice-generator/invoice-generator.component';

const routes: Routes = [
  { path: '', redirectTo: 'invoice', pathMatch: 'full' },
  { path: 'invoice', component: InvoiceGeneratorComponent },
  { path: 'management/clients', component: ClientListComponent },
  { path: 'management/clients/new', component: ClientFormComponent },
  { path: 'management/clients/edit/:id', component: ClientFormComponent },
  { path: 'management/consultants', component: ConsultantListComponent },
  { path: 'management/consultants/new', component: ConsultantFormComponent },
  { path: 'management/consultants/edit/:id', component: ConsultantFormComponent },
  { path: 'management/history', component: InvoiceHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
