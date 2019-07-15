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
import { AddUserList } from '../../+state/user/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store$: Store<UserState>,
    private http: HttpClient,
    private authDataService: AuthDataService,
  ) { }

  public singIn$(userLogin: string, userPassword: string): Observable<UserDto[]> {
    const checkUserAuthStore$ = this.store$.select(getUser(userLogin, userPassword));

    checkUserAuthStore$
      .pipe(
        take(1),
        tap(userList => this.login(userList)),
        tap((userList: UserDto[]) => this.authDataService.setAuthData(userList)),
        filter((userList: UserDto[]) => !userList.length),
        switchMap(() => this.http.get<UserDto[]>(`${BackUrl.api}/keep-money/${userPassword}/login/${userLogin}`)),
      )
      .subscribe(userList => this.store$.dispatch(new AddUserList(userList)));

    return checkUserAuthStore$;
  }

  public login(userList: UserDto[]): void {
    localStorage.setItem('token', JSON.stringify(userList[0]._id));
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}
