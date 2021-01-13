import { ActionReducerMap } from '@ngrx/store';
import { AuthenticationEffects } from './authentication/authentication.effects';
import * as fromAuthentication from './authentication/authentication.reducer';

export interface RootState {
  authentication: fromAuthentication.AuthenticationState;
}

export const effects = [AuthenticationEffects];

export const reducers: ActionReducerMap<RootState> = {
  authentication: fromAuthentication.reducer
};
