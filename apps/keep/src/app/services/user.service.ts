import { Injectable } from '@angular/core';
import { UserState } from '../+state/user/reducers/user.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store$: Store<UserState>) { }
}
