import { Injectable } from '@angular/core';
import { UserDto } from '../../../../../../libs/data/src';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  public authData$: BehaviorSubject<UserDto[]> = new BehaviorSubject<UserDto[]>(null);

  public setAuthData(userList: UserDto[]): void {
    this.authData$.next(userList);
  }
}

