import { createAction, props } from '@ngrx/store';
import { Auth } from 'src/app/shared/models/auth.model';
import { Credentials } from 'src/app/shared/models/credentials.model';
import { Signup } from 'src/app/shared/models/signup.model';

export const signup = createAction('[SIGN UP PAGE] Signup', props<{ payload: Signup }>());
export const signupSucces = createAction('[SIGN UP PAGE] Signup Success', props<{ payload: Signup }>());
export const signupFail = createAction('[SIGN UP PAGE] Signup Fails', props<{ message: string; error: Error }>());

export const login = createAction('[LOGIN PAGE] Login', props<{ payload: Credentials }>());
export const loginSuccess = createAction('[LOGIN PAGE] Login Succes', props<{ payload: Auth }>());
export const loginFail = createAction('[LOGIN PAGE] Login Fail', props<{ message: string }>());

export const logout = createAction('[LOGOUT PAGE] Logout');

// token
export const refreshToken = createAction('[Authentication] Refresh token');
export const refreshTokenSuccess = createAction('[Authentication] Refresh token success', props<Auth>());
export const refreshTokenFail = createAction(
  '[Authentication] Refresh token fail',
  props<{ message: string; error: Error }>()
);
