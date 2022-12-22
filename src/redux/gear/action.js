import {
  GET_CHOOSE_GEAR_FAILED,
  GET_CHOOSE_GEAR_REQUEST,
  GET_CHOOSE_GEAR_SUCCESS,
  GET_LIST_GEAR_FAILED,
  GET_LIST_GEAR_REQUEST,
  GET_LIST_GEAR_SUCCESS,
} from './actionType';

////////////////////////////////////////////////////////////////////  //////////////
export const getListGearRequest = () => ({
  type: GET_LIST_GEAR_REQUEST,
});

export const getListGearSuccess = payload => ({
  type: GET_LIST_GEAR_SUCCESS,
  payload: payload,
});
export const getListGearFailed = payload => ({
  type: GET_LIST_GEAR_FAILED,
  payload: payload,
});
////////////////////////////////////////////////////////////////////  //////////////

export const getChooseGearRequest = payload => ({
  type: GET_CHOOSE_GEAR_REQUEST,
  payload: payload,
});

export const getChooseGearSuccess = payload => ({
  type: GET_CHOOSE_GEAR_SUCCESS,
  payload: payload,
});
export const getChooseGearFailed = payload => ({
  type: GET_CHOOSE_GEAR_FAILED,
  payload: payload,
});
