import { Action } from '@ngrx/store';
import { UserDto } from '../../../../../../../libs/data/src';


export enum UserActionTypes {
  ADD_USER      = '[User] Add User',
  REMOVE_USER   = '[User] Remove  User',
  UPDATE_USER   = '[User] Update User',
}

export class AddUser implements Action {
  readonly type = UserActionTypes.ADD_USER;

  constructor(public payload: UserDto) {}
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.REMOVE_USER;

  constructor(public payload: Pick<UserDto, '_id'>) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE_USER;

  constructor(public payload: UserDto) {}
}

export type UserActions =
  | AddUser
  | RemoveUser
  | UpdateUser;
