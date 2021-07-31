import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { Token } from 'src/app/core/models/token.model';
import * as authActions from './authentication.actions';

export interface AuthenticationState {
  user: User | null;
  token: Token | null;
  error: string;
  pending: boolean;
  username: string;
}

export const initialState: AuthenticationState = {
  user: JSON.parse(localStorage.getItem('user') || 'null') as User,
  token: JSON.parse(localStorage.getItem('token') || 'null') as Token,
  error: '',
  pending: false,
  username: ''
};

const authReducer = createReducer(
  initialState,
  on(authActions.signup, state => ({ ...state, pending: true, error: '' })),
  on(authActions.signupSucces, (state, { payload }) => ({ ...state, username: payload.username, pending: false })),
  on(authActions.signupFail, state => ({ ...state, pending: false, error: '' })),

  on(authActions.login, state => ({ ...state, pending: true, error: '' })),
  on(authActions.loginSuccess, (state, { payload }) => ({
    ...state,
    pending: false,
    username: payload.user.username,
    user: payload.user,
    token: payload.token
  })),
  on(authActions.loginFail, (state, { message }) => ({ ...state, message, pending: false })),

  on(authActions.logout, state => ({ ...state, user: null, token: null, username: '' }))
);

export function reducer(state: AuthenticationState | undefined, action: Action): AuthenticationState {
  return authReducer(state, action);
}
