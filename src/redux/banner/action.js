import {
  GET_CHOOSE_BANNER_FAILED,
  GET_CHOOSE_BANNER_REQUEST,
  GET_CHOOSE_BANNER_SUCCESS,
  GET_LIST_BANNER_FAILED,
  GET_LIST_BANNER_REQUEST,
  GET_LIST_BANNER_SUCCESS,
} from './actionType';

////////////////////////////////////////////////////////////////////  //////////////
export const getListBannerRequest = payload => ({
  type: GET_LIST_BANNER_REQUEST,
});

export const getListBannerSuccess = payload => ({
  type: GET_LIST_BANNER_SUCCESS,
  payload: payload,
});
export const getListGearFailed = payload => ({
  type: GET_LIST_BANNER_FAILED,
  payload: payload,
});
////////////////////////////////////////////////////////////////////  //////////////

export const getChooseBannerRequest = payload => ({
  type: GET_CHOOSE_BANNER_REQUEST,
  payload: payload,
});

export const getChooseBannerSuccess = payload => ({
  type: GET_CHOOSE_BANNER_SUCCESS,
  payload: payload,
});
export const getChooseBannerFailed = payload => ({
  type: GET_CHOOSE_BANNER_FAILED,
  payload: payload,
});
