import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';

const appRoutes: Routes = [
  { path: 'home', 
    component: AppComponent 
  },
  {
    path: 'about',
    component: ClientComponent
  }
];
export default appRoutes;