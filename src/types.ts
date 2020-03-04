import { Action, AnyAction } from 'redux';
import { User } from 'oidc-client';

export enum AuthActionTypes {
  SIGNIN = '@auth/SIGNIN',
  SIGNIN_COMPLETE = '@auth/SIGNIN_COMPLETE',
  SIGNIN_SUCCESS = '@auth/SIGNIN_SUCCESS',
  SIGNIN_FAILED = '@auth/SIGNIN_FAILED',
  SIGNOUT = '@auth/SIGNOUT',
  SIGNOUT_COMPLETE = '@auth/SIGNOUT_COMPLETE',
  SIGNOUT_SUCCESS = '@auth/SIGNOUT_SUCCESS',
  SIGNOUT_FAILED = '@auth/SIGNOUT_FAILED',
  ACQUIRE_ACCESSTOKEN = '@auth/ACQUIRE_ACCESSTOKEN',
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  error?: any;
}

export interface SignInAction {
  type: typeof AuthActionTypes.SIGNIN;
  payload: {
    state: any;
  };
}

export interface SignInCompleteAction {
  type: typeof AuthActionTypes.SIGNIN_COMPLETE;
  payload: {
    url: string;
  };
}

export interface SignInSuccessAction {
  type: typeof AuthActionTypes.SIGNIN_SUCCESS;
  payload: {
    user: User;
  };
}

export interface SignInFailedAction {
  type: typeof AuthActionTypes.SIGNIN_FAILED;
  payload: {
    error: any;
  };
}

export interface SignOutAction {
  type: typeof AuthActionTypes.SIGNOUT;
  payload: {
    state: any;
  };
}

export interface SignOutCompleteAction {
  type: typeof AuthActionTypes.SIGNOUT_COMPLETE;
  payload: {
    url: string;
  };
}

export interface SignOutSuccessAction {
  type: typeof AuthActionTypes.SIGNOUT_SUCCESS;
}

export interface SignOutFailedActino {
  type: typeof AuthActionTypes.SIGNOUT_FAILED;
  payload: {
    error: any;
  };
}

export type AuthActions =
  | SignInAction
  | SignInCompleteAction
  | SignInSuccessAction
  | SignInFailedAction
  | SignOutAction
  | SignOutCompleteAction
  | SignOutSuccessAction
  | SignOutFailedActino;
