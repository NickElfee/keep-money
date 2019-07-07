import { Injectable } from '@angular/core';
import { UserState } from '../../+state/user/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../../../../../libs/data/src';
import { getUser } from '../../+state/user/selectors/user.selectors';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { BackUrl } from '../../configs/backend-url.enum';
import { AuthDataService } from './auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store$: Store<UserState>,
    private _http: HttpClient,
    private authDataService: AuthDataService,
  ) { }

  public singIn$(userLogin: string, userPassword: string): Observable<UserDto[]> {
    const checkUserAuthStore$ = this.store$.select(getUser(userLogin, userPassword));

    checkUserAuthStore$
      .pipe(
        take(1),
        tap((userList: UserDto[]) => this.authDataService.setAuthData(userList)),
        filter((userList: UserDto[]) => !userList.length),
        switchMap(() => this._http.get<UserDto[]>(`${BackUrl.api}/keep-money/${userPassword}/login/${userLogin}`)),
      )
      .subscribe();

    return checkUserAuthStore$;
  }

  public verify$(): any {
    return this.authDataService.authData$.value;
  }
}
