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
  USER_SET_ERROR,
  USER_SET_AVATAR,
  USER_SET_SUCCESS_MESSAGE,
} from './userActionTypes';
import { IUser, IUserState } from '~/interfaces';
const jwt = require('jsonwebtoken');
import Cookie from 'js-cookie';

const dateNow = new Date();
let access = '';
let refresh = '';

if (typeof window !== 'undefined') {
  access = localStorage.getItem('access') || '';
  refresh = localStorage.getItem('refresh') || '';
}
let isAuthenticated = false;
if (refresh) {
  const decodedRefresh = jwt.decode(refresh, { complete: true });
  if (decodedRefresh?.exp * 1000 < dateNow.getTime()) {
    refresh = '';
  }
}
if (access) {
  const decoded = jwt.decode(access, { complete: true });

  if (decoded?.payload.exp * 1000 < dateNow.getTime()) {
    access = '';
  } else {
    isAuthenticated = true;
  }
}

try {
  const accessCook = Cookie.get('access');
  const decoded = jwt.decode(accessCook as string, { complete: true });
  if (decoded?.payload.exp * 1000 < dateNow.getTime()) {
    Cookie.remove('access');
    Cookie.remove('refresh');
    Cookie.remove('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  }
} catch (e) {
  console.log(e);
}

// Trying to get user from localstorage if not empty strings
let user = {} as IUser | null;
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem('user') as string) || null;
}
let email = user ? user.email : '';
let username = user ? user.username : '';
let id = user ? user.id : '';
let image = user ? user.image : null;

const initialState: IUserState = {
  access: access,
  refresh: refresh,
  isAuthenticated: isAuthenticated,
  email: email,
  username: username,
  id: id,
  errors: null,
  image: image,
  message: null,
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
      Cookie.set('access', action.payload?.tokens.access!);
      Cookie.set('refresh', action.payload?.tokens.access!);
      Cookie.set('user', {
        id: action.payload?.id,
        username: action.payload?.username,
        email: action.payload?.email,
        // Herre is image fucks up
        // image: action.payload?.image,
      });
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: action.payload?.id,
          username: action.payload?.username,
          email: action.payload?.email,
          // image: action.payload?.image,
        })
      );
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload?.tokens.access,
        refresh: action.payload?.tokens.refresh,
        email: action.payload?.email,
        username: action.payload?.username,
        id: action.payload?.id,
        // image: action.payload?.image,
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
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: action.payload?.id,
          username: action.payload?.username,
          email: action.payload?.email,
          image: action.payload?.image,
        })
      );
      Cookie.set('access', action.payload?.tokens.access!);
      Cookie.set('refresh', action.payload?.tokens.access!);
      Cookie.set('user', {
        id: action.payload?.id,
        username: action.payload?.username,
        email: action.payload?.email,
        image: action.payload?.image,
      });
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload?.tokens.access,
        refresh: action.payload?.tokens.refresh,
        email: action.payload?.email,
        username: action.payload?.username,
        id: action.payload?.id,
        image: action.payload?.image,
      };
    case USER_LOGOUT:
    case USER_GOOGLE_LOGIN_FAIL:
    case USER_LOGIN_FAIL:
    case USER_SIGN_UP_FAIL:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      Cookie.remove('access');
      Cookie.remove('refresh');
      Cookie.remove('user');
      return {
        ...state,
        username: null,
        email: null,
        id: null,
        image: null,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    case USER_ACTIVATION_SUCCESS:
      return {
        ...state,
      };
    case USER_PASSWORD_RESET_SUCCESS:
    case USER_PASSWORD_RESET_FAIL:
    case USER_PASSWORD_RESET_CONFIRM_SUCCESS:
    case USER_PASSWORD_RESET_CONFIRM_FAIL:
    case USER_ACTIVATION_FAIL:
      return {
        ...state,
      };
    case USER_SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case USER_SET_AVATAR:
      return {
        ...state,
        image: action.payload,
      };
    case USER_SET_SUCCESS_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};
