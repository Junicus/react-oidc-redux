import { Reducer } from 'redux';
import { AuthState, AuthActionTypes, AuthActions } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
};

export const reducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        error: undefined,
      };
    case AuthActionTypes.SIGNIN_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        ...state,
        user: undefined,
        isAuthenticated: false,
        error: undefined,
      };
    case AuthActionTypes.SIGNOUT_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
