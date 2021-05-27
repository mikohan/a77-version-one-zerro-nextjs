import { IJwt } from '~/interfaces';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL';
export const USER_AUTHENTICATED_SUCCESS = 'USER_AUTHENTICATED_SUCCESS';
export const USER_AUTHENTICATED_FAIL = 'USER_AUTHENTICATED_FAIL';
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS';
export const USER_PASSWORD_RESET_FAIL = 'USER_PASSWORD_RESET_FAIL';
export const USER_PASSWORD_RESET_CONFIRM_SUCCESS =
  'USER_PASSWORD_RESET_CONFIRM_SUCCESS';
export const USER_PASSWORD_RESET_CONFIRM_FAIL =
  'USER_PASSWORD_RESET_CONFIRM_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS';
export const USER_SIGN_UP_FAIL = 'USER_SIGN_UP_FAIL';
export const USER_ACTIVATION_SUCCESS = 'USER_ACTIVATION_SUCCESS';
export const USER_ACTIVATION_FAIL = 'USER_ACTIVATION_FAIL';
export const USER_GOOGLE_LOGIN_SUCCESS = 'USER_GOOGLE_LOGIN_SUCCESS';
export const USER_GOOGLE_LOGIN_FAIL = 'USER_GOOGLE_LOGIN_FAIL';
export const USER_SET_ERROR = 'USER_SET_ERROR';
export const USER_SET_AVATAR = 'USER_SET_AVATAR';
export const USER_SET_SUCCESS_MESSAGE = 'USER_SET_SUCCESS_MESSAGE';

export interface IUserSuccessMessage {
  type: typeof USER_SET_SUCCESS_MESSAGE;
  payload: any;
}

export interface IUserData {
  email: string;
  username: string;
  image?: string;
  tokens: IJwt;
  id: string | number;
}

export interface IUserSetAvatarAction {
  type: typeof USER_SET_AVATAR;
  payload: string;
}

export interface IUserError {
  type: typeof USER_SET_ERROR;
  payload: any;
}

export interface IUserLogin {
  type: typeof USER_LOGIN_SUCCESS | typeof USER_LOGIN_FAIL;
  payload: IUserData | null;
}
export interface IUserFetchAction {
  type: typeof USER_LOADED_SUCCESS | typeof USER_LOADED_FAIL;
  payload: IUserData | null;
}

export interface ILogout {
  type: typeof USER_LOGOUT;
}

export interface IUserAuthenticatedCheckAction {
  type: typeof USER_AUTHENTICATED_SUCCESS | typeof USER_AUTHENTICATED_FAIL;
  payload?: boolean;
}

export interface IUserResetPasswordAction {
  type: typeof USER_PASSWORD_RESET_SUCCESS | typeof USER_PASSWORD_RESET_FAIL;
}
export interface IUserResetPasswordConfirmAction {
  type:
    | typeof USER_PASSWORD_RESET_CONFIRM_SUCCESS
    | typeof USER_PASSWORD_RESET_CONFIRM_FAIL;
}

export interface IUserSignUpAction {
  type: typeof USER_SIGN_UP_SUCCESS | typeof USER_SIGN_UP_FAIL;
  payload: boolean | null;
}
export interface IUserActivationAction {
  type: typeof USER_ACTIVATION_SUCCESS | typeof USER_ACTIVATION_FAIL;
}

export interface IGoogleLoginAction {
  type: typeof USER_GOOGLE_LOGIN_SUCCESS | typeof USER_GOOGLE_LOGIN_FAIL;
  payload: IUserData | null;
}

export type IUserAction =
  | IUserLogin
  | IUserFetchAction
  | ILogout
  | IUserAuthenticatedCheckAction
  | IUserResetPasswordAction
  | IUserResetPasswordConfirmAction
  | IUserSignUpAction
  | IUserActivationAction
  | IGoogleLoginAction
  | IUserError
  | IUserSetAvatarAction
  | IUserSuccessMessage;
