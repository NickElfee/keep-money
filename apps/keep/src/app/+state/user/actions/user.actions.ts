import { Action } from '@ngrx/store';
import { UserDto } from '../../../../../../../libs/data/src';


export enum UserActionTypes {
  ADD_USER_LIST = '[User] Add User list',
  REMOVE_USER   = '[User] Remove  User',
  UPDATE_USER   = '[User] Update User',
}

export class AddUserList implements Action {
  readonly type = UserActionTypes.ADD_USER_LIST;

  constructor(public payload: UserDto[]) {}
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
  | AddUserList
  | RemoveUser
  | UpdateUser;
