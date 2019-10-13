import { Injectable } from '@angular/core';
import { UserState } from '../+state/user/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from '../../../../../libs/data/src';
import { HttpClient } from '@angular/common/http';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AddUserList } from '../+state/user/actions/user.actions';
import { getUserIdentifyForm, getUserList } from '../+state/user/selectors/user.selectors';
import { BackUrl } from '../configs/backend-url.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store$: Store<UserState>,
              private http: HttpClient,
  ) { }

  public getUserList(): Observable<UserDto[]> {
    const checkStoreUser$: Observable<UserDto[]> = this.store$.select(getUserList);

    checkStoreUser$.pipe(
      take(1),
      filter((userList: UserDto[]) => !userList.length),
      switchMap(() => this.http.get<UserDto[]>(`${BackUrl.api}/keep-money/user`)),
    )
      .subscribe((userList: UserDto[]) => this.store$.dispatch(new AddUserList(userList)));

    return checkStoreUser$;
  }

  public identifyUser(userEmail: string, userLogin: string): Observable<UserDto[]> {
    const checkUserIdentify$ = this.store$.select(getUserIdentifyForm(userEmail, userLogin));

    checkUserIdentify$
      .pipe(
        filter(Boolean),
        take(1),
        filter((userDto: UserDto[]) => !(!userDto.length)),
        switchMap(() => this.http.get<UserDto[]>(`${BackUrl.api}/keep-money/identify/${userLogin}/${userEmail}`)),
        filter((userDto: UserDto[]) => !(!userDto.length)),
      )
      .subscribe();

    return checkUserIdentify$;
  }

  public setUser(user: UserDto): Observable<any> {
    return this.http.post<any>(`${BackUrl.api}/login`, user);
  }

  public getCurrentUserById(): Observable<UserDto[]> {
    const currentUserId = JSON.parse(localStorage.getItem('token'));
    return this.getUserList()
      .pipe(
        map((userList: UserDto[]) => userList
          .filter(user => user._id === currentUserId),
      )
    );
  }

}
