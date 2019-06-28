import { Injectable } from '@angular/core';
import { UserState } from '../+state/user/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from '../../../../../libs/data/src';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap, take } from 'rxjs/operators';
import { AddUserList } from '../+state/user/actions/user.actions';
import { getUser, getUserList } from '../+state/user/selectors/user.selectors';
import { BackUrl } from '../configs/backend-url.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store$: Store<UserState>,
              private _http: HttpClient,
  ) { }

  public getUserList(): Observable<UserDto[]> {
    const checkStoreUser$: Observable<UserDto[]> = this.store$.select(getUserList);

    checkStoreUser$.pipe(
      take(1),
      filter((userList: UserDto[]) => !userList.length),
      switchMap(() => this._http.get<UserDto[]>(`${BackUrl.api}/keep-money/user`)),
    )
      .subscribe((userList: UserDto[]) => this.store$.dispatch(new AddUserList(userList)));

    return checkStoreUser$;
  }

  public getUser(userLogin: string, userPassword: string): Observable<UserDto[]> {
    const checkUserAuthStore$ = this.store$.select(getUser(userLogin, userPassword));

    checkUserAuthStore$
      .pipe(
        take(1),
        filter((userList: UserDto[]) => !userList.length),
        switchMap(() => this._http.get<UserDto>(`${BackUrl.api}/keep-money/${userPassword}/login/${userLogin}`)),
        filter((userDto: UserDto) => !userDto),
      )
      .subscribe();

    return checkUserAuthStore$;
  }

  public setUser(user: UserDto): Observable<any> {
    return this._http.post<any>(`${BackUrl.api}/login`, user);
  }

}
