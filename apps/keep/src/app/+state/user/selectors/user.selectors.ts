import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, selectEntities, selectAll, UserState } from '../reducers/user.reducer';
import { UserDto } from '../../../../../../../libs/data/src';

const selectState = createFeatureSelector<UserState>(USER_FEATURE_KEY);
const getEntities = createSelector(selectState, selectEntities);

export const getUserList = createSelector(selectState, selectAll);

export const getUser = (login: string, password: string) =>
  createSelector(getUserList, (userList: UserDto[]) => userList.filter((user: UserDto) =>
    ((user.login === login) && (user.password === password)) ? user : false
  ));

export const getUserIdentifyForm = (email: string, login: string) =>
  createSelector(getUserList, (userList: UserDto[]) => userList.filter((user: UserDto) =>
    ((user.email === email) || (user.login === login)) ? user : false
  ));
