import {
  GET_ADD_ONE_ADDRESS_FAILED,
  GET_ADD_ONE_ADDRESS_REQUEST,
  GET_ADD_ONE_ADDRESS_SUCCESS,
  GET_CHANGE_ADDRESS_FAILED,
  GET_CHANGE_ADDRESS_REQUEST,
  GET_CHANGE_ADDRESS_SUCCESS,
  GET_CHOOSE_LOCATION_FAILED,
  GET_CHOOSE_LOCATION_REQUEST,
  GET_CHOOSE_LOCATION_SUCCESS,
  GET_DELETE_ADDRESS_FAILED,
  GET_DELETE_ADDRESS_REQUEST,
  GET_DELETE_ADDRESS_SUCCESS,
  GET_LIST_LOCATION_FAILED,
  GET_LIST_LOCATION_REQUEST,
  GET_LIST_LOCATION_SUCCESS,
} from './actionType';

///////////////////////////////////// get all list location /////////////////////////////////////////////
export const getListLocationRequest = payload => ({
  type: GET_LIST_LOCATION_REQUEST,
});

export const getListLocationSuccess = payload => ({
  type: GET_LIST_LOCATION_SUCCESS,
  payload: payload,
});
export const getLiLocationFailed = payload => ({
  type: GET_LIST_LOCATION_FAILED,
  payload: payload,
});
///////////////////////////////////////// choose a address from list address /////////////////////////////////////////////////////////////////////////

export const getChooseLocationRequest = payload => ({
  type: GET_CHOOSE_LOCATION_REQUEST,
  payload: payload,
});

export const getChooseLocationSuccess = payload => ({
  type: GET_CHOOSE_LOCATION_SUCCESS,
  payload: payload,
});
export const getChooseLocationFailed = payload => ({
  type: GET_CHOOSE_LOCATION_FAILED,
  payload: payload,
});
/////////////////////////////////////// delete one address /////////////////////////////////////////////////////

export const getDeleteAddressRequest = payload => ({
  type: GET_DELETE_ADDRESS_REQUEST,
  payload: payload,
});

export const getDeleteAddressSuccess = payload => ({
  type: GET_DELETE_ADDRESS_SUCCESS,
  payload: payload,
});

export const getDeleteAddressFailed = payload => ({
  type: GET_DELETE_ADDRESS_FAILED,
  payload: payload,
});

/////////////////////////////////////// edit one address /////////////////////////////////////////////////////

export const getChangeShippingAddressRequest = payload => ({
  type: GET_CHANGE_ADDRESS_REQUEST,
  payload: payload,
});

export const getChangeShippingAddressSuccess = payload => ({
  type: GET_CHANGE_ADDRESS_SUCCESS,
  payload: payload,
});

export const getChangeShippingAddressFailed = payload => ({
  type: GET_CHANGE_ADDRESS_FAILED,
  payload: payload,
});

/////////////////////////////////////// add one address /////////////////////////////////////////////////////

export const getAddOneAddressRequest = payload => ({
  type: GET_ADD_ONE_ADDRESS_REQUEST,
  payload: payload,
});

export const getAddOneAddressSuccess = payload => ({
  type: GET_ADD_ONE_ADDRESS_SUCCESS,
  payload: payload,
});

export const getAddOneAddressFailed = payload => ({
  type: GET_ADD_ONE_ADDRESS_FAILED,
  payload: payload,
});
