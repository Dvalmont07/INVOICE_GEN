import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { ConsultantComponent } from './components/consultant/consultant.component';
import { InvoiceComponent } from './components/invoice/invoice.component';


const routes: Routes = [

  {
    path: "",
    component: ConsultantComponent,
    data: { title: "Consultant" },
  },
  {
    path: "consultant",
    component: ConsultantComponent,
    data: { title: "Consultant" },
  },
  {
    path: "client",
    component: ClientComponent,
    data: { title: "Client" },
  },
  {
    path: "invoice",
    component: InvoiceComponent,
    data: { title: "Invoice" },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
