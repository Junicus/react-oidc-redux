import { AuthActionTypes, SignInAction, SignInCompleteAction, SignOutCompleteAction, SignOutAction } from './types';
import { ActionCreator } from 'redux';

export const login: ActionCreator<SignInAction> = (state: any) => ({
  type: AuthActionTypes.SIGNIN,
  payload: {
    state,
  },
});

export const loginComplete: ActionCreator<SignInCompleteAction> = (url: string) => ({
  type: AuthActionTypes.SIGNIN_COMPLETE,
  payload: {
    url,
  },
});

export const logout: ActionCreator<SignOutAction> = (state: any) => ({
  type: AuthActionTypes.SIGNOUT,
  payload: {
    state,
  },
});

export const logoutComplete: ActionCreator<SignOutCompleteAction> = (url: string) => ({
  type: AuthActionTypes.SIGNOUT_COMPLETE,
  payload: {
    url,
  },
});
