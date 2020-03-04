import { login, logout } from '../index';
import { AuthActionTypes } from '../types';

test('login', () => {
  expect(login({ test: '1' })).toMatchObject({
    payload: {
      state: { test: '1' },
    },
    type: AuthActionTypes.SIGNIN,
  });
});

test('logout', () => {
  expect(logout({ test: '1' })).toMatchObject({
    type: AuthActionTypes.SIGNOUT,
    payload: {
      state: { test: '1' },
    },
  });
});
