import { UserManager, UserManagerSettings } from 'oidc-client';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { AuthActions, AuthState, AuthActionTypes } from './types';

let userManager: UserManager = null;

export const createAuthMiddleware = (settings: UserManagerSettings, usePopup: boolean): Middleware => {
  userManager = new UserManager(settings);

  return ({ dispatch }: MiddlewareAPI<Dispatch<AuthActions>, AuthState>) => {
    userManager.events.addUserSignedOut(async () => {
      await userManager.removeUser();
      dispatch({ type: AuthActionTypes.SIGNOUT_SUCCESS });
    });

    return (next: Dispatch) => (action: AuthActions) => {
      switch (action.type) {
        case AuthActionTypes.SIGNIN:
          signIn(action.payload.state, usePopup)(dispatch);
          return next(action);
        case AuthActionTypes.SIGNIN_COMPLETE:
          signInComplete(action.payload.url)(dispatch);
          return next(action);
        case AuthActionTypes.SIGNOUT:
          signOut(action.payload.state, usePopup)(dispatch);
          return next(action);
        case AuthActionTypes.SIGNOUT_COMPLETE:
          signOutComplete(action.payload.url)(dispatch);
          return next(action);
        default:
          return next(action);
      }
    };
  };
};

function signIn(state: any, usePopup: boolean) {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      const silentUser = await userManager.signinSilent(createArguments());
      dispatch({
        type: AuthActionTypes.SIGNIN_SUCCESS,
        payload: {
          user: silentUser,
        },
      });
    } catch (silentError) {
      console.error('Silent authentication error: ', silentError);

      try {
        if (!usePopup) {
          throw new Error('Popup disabled.');
        }

        const popupUser = await userManager.signinPopup(createArguments());
        dispatch({
          type: AuthActionTypes.SIGNIN_SUCCESS,
          payload: {
            user: popupUser,
          },
        });
      } catch (popupError) {
        if (popupError.message === 'Popup window closed.') {
          dispatch({
            type: AuthActionTypes.SIGNIN_FAILED,
            payload: {
              error: popupError,
            },
          });
        } else if (usePopup) {
          console.error('Popup authentication error: ', popupError);
        }

        try {
          await userManager.signinRedirect(createArguments(state));
        } catch (redirectError) {
          console.error('Redirect authentication error: ', redirectError);
          dispatch({
            type: AuthActionTypes.SIGNIN_FAILED,
            payload: {
              error: redirectError,
            },
          });
        }
      }
    }
  };
}

function signInComplete(url: string) {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      const user = await userManager.signinCallback(url);
      dispatch({
        type: AuthActionTypes.SIGNIN_SUCCESS,
        payload: {
          user,
        },
      });
    } catch (error) {
      console.error('There was an error signing in: ', error);
      dispatch({
        type: AuthActionTypes.SIGNIN_FAILED,
        payload: {
          error,
        },
      });
    }
  };
}

function signOut(state: any, usePopup: boolean) {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      if (!usePopup) {
        throw new Error('Popup disabled.');
      }
      await userManager.signoutPopup(createArguments());
      dispatch({ type: AuthActionTypes.SIGNOUT_SUCCESS });
    } catch (popupError) {
      console.error('Popup signout error: ', popupError);
      try {
        await userManager.signoutRedirect(createArguments(state));
      } catch (redirectError) {
        console.error('Redirect signout error: ', redirectError);
        dispatch({
          type: AuthActionTypes.SIGNOUT_FAILED,
          payload: {
            error: redirectError,
          },
        });
      }
    }
  };
}

function signOutComplete(url: string) {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      const response = await userManager.signoutCallback(url);
      dispatch({
        type: AuthActionTypes.SIGNOUT_SUCCESS,
      });
    } catch (error) {
      console.error('There was an error signing out: ', error);
      dispatch({
        type: AuthActionTypes.SIGNIN_FAILED,
        payload: {
          error,
        },
      });
    }
  };
}

function createArguments(state?: any) {
  return { useReplaceToNavigation: true, data: state };
}
