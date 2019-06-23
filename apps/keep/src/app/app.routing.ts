import { RouterModule, Routes } from '@angular/router';
import { RouterUrl } from './configs/router-url.enum';
import { LoginComponent } from './components/page/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: RouterUrl.LOGIN, pathMatch: 'full' },
  { path: RouterUrl.LOGIN, component: LoginComponent },
];


export const routing = RouterModule.forRoot(routes);
