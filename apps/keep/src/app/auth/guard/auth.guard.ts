import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterUrl } from '../../configs/router-url.enum';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public canActivate(): any {
    const userVerify = JSON.parse(localStorage.getItem('token'));
    if (!userVerify) {
      this.router.navigate([`/${RouterUrl.LOGIN}`]);
      return of(false);
    }
    return of(true);
  }
}
