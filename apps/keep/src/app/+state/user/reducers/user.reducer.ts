import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducer } from '@ngrx/store';
import { UserDto } from '../../../../../../../libs/data/src';
import {
  AddUserList,
  RemoveUser,
  UpdateUser,
  UserActions, UserActionTypes
} from '../actions/user.actions';

export const USER_FEATURE_KEY = 'user';

export const userAdapter = createEntityAdapter<UserDto>({
  selectId: ({ _id }: UserDto) => _id,
});

export interface UserState extends EntityState<UserDto> {}

export const userInitialState: UserState = userAdapter.getInitialState({});

const reducers: Record<UserActionTypes, ActionReducer<UserState>> = {
  [UserActionTypes.ADD_USER_LIST]: addUserList,
  [UserActionTypes.UPDATE_USER]: updateUser,
  [UserActionTypes.REMOVE_USER]: removeUser,
};

export function addUserList(state: UserState,  { payload }: AddUserList): UserState {
  return userAdapter.addMany(payload, state);
}

export function updateUser(state: UserState, { payload }: UpdateUser): UserState {
  return userAdapter.updateOne({id: payload._id, changes: payload}, state);
}

function removeUser(state: UserState, { payload: { _id } }: RemoveUser): UserState {
  return userAdapter.removeOne(_id, state);
}

export function reducer(state: UserState = userInitialState, action: UserActions): UserState {
  return action.type in reducers ? reducers[action.type](state, action) : state;
}

export const {
  selectAll,
  selectEntities,
} = userAdapter.getSelectors();
