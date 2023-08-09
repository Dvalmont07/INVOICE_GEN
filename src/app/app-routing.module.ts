import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ConsultantComponent } from './consultant/consultant.component';


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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
