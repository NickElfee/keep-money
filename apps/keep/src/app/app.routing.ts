import { RouterModule, Routes } from '@angular/router';
import { RouterUrl } from './configs/router-url.enum';
import { LoginComponent } from './components/page/login/login.component';
import { UserPageComponent } from './components/page/user-page/user-page.component';
import { UserIdPageComponent } from './components/smart/user-id-page/user-id-page.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: RouterUrl.LOGIN, pathMatch: 'full' },
  { path: RouterUrl.LOGIN, component: LoginComponent },
  { path: RouterUrl.USER, component: UserPageComponent, canActivate: [AuthGuard], children: [
      { path: ':id', component: UserIdPageComponent},
    ]},
];


export const routing = RouterModule.forRoot(routes);
