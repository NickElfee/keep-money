import { RouterModule, Routes } from '@angular/router';
import { RouterUrl } from './configs/router-url.enum';
import { LoginComponent } from './components/page/login/login.component';
import { HeaderComponent } from './components/smart/header/header.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: RouterUrl.LOGIN, pathMatch: 'full' },
  { path: RouterUrl.LOGIN, component: LoginComponent },
  { path: RouterUrl.USER, component: HeaderComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: RouterUrl.USER, pathMatch: 'full' },
      { path: ':id', component: HeaderComponent},
    ]},
];


export const routing = RouterModule.forRoot(routes);
