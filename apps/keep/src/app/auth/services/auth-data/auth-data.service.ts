import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../../../../../../../libs/data/src';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  public authData$: BehaviorSubject<UserDto[]> = new BehaviorSubject<UserDto[]>(null);
  constructor() { }

  public setAuthData(authUser: UserDto[]): void {
    this.authData$.next(authUser);
  }
}
