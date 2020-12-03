import { createSelector } from '@ngrx/store';
import { RootState } from '..';

const selectAuthenticationState = (state: RootState) => state.authentication;

export const selectUser = createSelector(selectAuthenticationState, state => state.user);
export const selectTokenData = createSelector(selectAuthenticationState, state => state.token);
export const selectAuthPending = createSelector(selectAuthenticationState, state => state.pending);
export const selectUsername = createSelector(selectAuthenticationState, state => state.username);
