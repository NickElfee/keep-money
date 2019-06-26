import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, selectEntities, selectAll, UserState } from '../reducers/user.reducer';

const selectState = createFeatureSelector<UserState>(USER_FEATURE_KEY);
const getEntities = createSelector(selectState, selectEntities);

export const getUser = createSelector(selectState, selectAll);
