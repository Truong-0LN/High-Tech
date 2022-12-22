import {
    GET_NOTIFICATION_FAILED,
    GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  POST_DEVICE_TOKEN_FAILED,
  POST_DEVICE_TOKEN_REQUEST,
  POST_DEVICE_TOKEN_SUCCESS,
} from './actionType';

///////////////////////////////////////// post devices token /////////////////////////////////

export const postDeviceTokenRequest = payload => ({
  type: POST_DEVICE_TOKEN_REQUEST,
  payload: payload,
});
export const postDeviceTokenSuccess = payload => ({
  type: POST_DEVICE_TOKEN_SUCCESS,
  payload: payload,
});
export const postDeviceTokenFailed = payload => ({
  type: POST_DEVICE_TOKEN_FAILED,
  payload: payload,
});

///////////////////////////////////////// get notification /////////////////////////////////

export const getNotificationRequest = payload => ({
    type: GET_NOTIFICATION_REQUEST,
    payload: payload,
  });
  export const getNotificationSuccess = payload => ({
    type: GET_NOTIFICATION_SUCCESS,
    payload: payload,
  });
  export const getNotificationFailed = payload => ({
    type: GET_NOTIFICATION_FAILED,
    payload: payload,
  });
