import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {catchError, filter, map, take, tap} from 'rxjs/operators';
import { RouterUrl } from '../../configs/router-url.enum';
import { of } from 'rxjs';
import {UserDto} from '../../../../../../libs/data/src';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public canActivate(): any {
  return this.authService.verify$()
    .pipe(
      take(1),
      filter(Boolean),
      filter((authUser: UserDto[]) => !authUser.length === false),
      map(() => {
        this.router.navigate([`/${RouterUrl.LOGIN}`]);
      }),
    );
}
}
