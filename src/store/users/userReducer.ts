import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  USER_AUTHENTICATED_SUCCESS,
  USER_AUTHENTICATED_FAIL,
  USER_LOGOUT,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAIL,
  USER_PASSWORD_RESET_CONFIRM_SUCCESS,
  USER_PASSWORD_RESET_CONFIRM_FAIL,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
  USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION_FAIL,
  IUserAction,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
} from './userActionTypes';
import { IUserState } from '../../intefaces';
import jwt from 'jsonwebtoken';
import { IUser } from '../../intefaces/user';

const dateNow = new Date();

let token = localStorage.getItem('access') || null;
let refresh = localStorage.getItem('refresh') || null;
let isAuthenticated = false;
if (refresh) {
  const decodedRefresh = jwt.decode(refresh, { complete: true });
  if (decodedRefresh?.exp < dateNow.getTime()) {
    refresh = null;
  }
}
if (token) {
  const decoded = jwt.decode(token, { complete: true });

  if (decoded?.exp < dateNow.getTime()) {
    token = null;
  } else {
    isAuthenticated = true;
  }
}

let user: IUser | null =
  JSON.parse(localStorage.getItem('user') as string) || null;

const initialState: IUserState = {
  access: token,
  refresh: refresh,
  isAuthenticated: isAuthenticated,
  user: user,
};

export const userReducer = (
  state: IUserState = initialState,
  action: IUserAction
) => {
  switch (action.type) {
    case USER_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case USER_AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };

    case USER_LOGIN_SUCCESS:
      localStorage.setItem('access', action.payload?.tokens.access!);
      localStorage.setItem('refresh', action.payload?.tokens.refresh!);
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: action.payload?.username,
          email: action.payload?.email,
        })
      );
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload?.tokens.access,
        refresh: action.payload?.tokens.refresh,
        user: {
          email: action.payload?.email,
          username: action.payload?.username,
        },
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case USER_GOOGLE_LOGIN_SUCCESS:
      localStorage.setItem('access', action.payload?.tokens.access!);
      localStorage.setItem('refresh', action.payload?.tokens.refresh!);
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload?.tokens.access,
        refresh: action.payload?.tokens.refresh,
        user: {
          email: action.payload?.email,
          username: action.payload?.username,
        },
      };
    case USER_LOGOUT:
    case USER_GOOGLE_LOGIN_FAIL:
    case USER_LOGIN_FAIL:
    case USER_SIGN_UP_FAIL:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
      };
    case USER_PASSWORD_RESET_SUCCESS:
    case USER_PASSWORD_RESET_FAIL:
    case USER_PASSWORD_RESET_CONFIRM_SUCCESS:
    case USER_PASSWORD_RESET_CONFIRM_FAIL:
    case USER_ACTIVATION_SUCCESS:
    case USER_ACTIVATION_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
