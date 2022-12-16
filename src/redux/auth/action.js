import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from './actionType';
///////////////////////////////// login //////////////////////////////////////////
export const loginRequest = (payload, onSuccess) => ({
  type: LOGIN_REQUEST,
  payload: payload,
  onSuccess: onSuccess,
});
export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});
export const loginFailed = payload => ({
  type: LOGIN_FAILED,
  payload: payload,
});
//////////////////////////////////// register ///////////////////////////////////////////////////
export const signUpRequest = (payload, onSuccess) => ({
  type: SIGN_UP_REQUEST,
  payload: payload,
  onSuccess: onSuccess,
});
export const signUpSuccess = payload => ({
  type: SIGN_UP_SUCCESS,
  payload: payload,
});
export const signUpFailed = payload => ({
  type: SIGN_UP_FAILED,
  payload: payload,
});
//////////////////////////////////// change password ///////////////////////////////////////////////////
export const changePasswordRequest = payload => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: payload,
});
export const changePasswordSuccess = payload => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: payload,
});
export const changePasswordFailed = payload => ({
  type: CHANGE_PASSWORD_FAILED,
  payload: payload,
});
////////////////////////////////////// logout /////////////////////////////////////////////////
export const logoutRequest = onSuccess => ({
  type: LOGOUT_REQUEST,
  onSuccess: onSuccess,
});
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
//////////////////////////////// get  user info ///////////////////////////////////

export const getUserInfoRequest = () => ({
  type: GET_USER_INFO_REQUEST,
});

export const getUserInfoSuccess = payload => ({
  type: GET_USER_INFO_SUCCESS,
  payload: payload,
});

export const getUserInfoFailed = payload => ({
  type: GET_USER_INFO_FAILED,
  payload: payload,
});

//////////////////////////////// update user info //////////////////////////////////
