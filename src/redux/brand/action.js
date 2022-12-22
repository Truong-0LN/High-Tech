import {
  GET_LIST_BRAND_FAILED,
  GET_LIST_BRAND_REQUEST,
  GET_LIST_BRAND_SUCCESS,
} from './actionType';
///////////////////////////////// get list brand //////////////////////////////////
export const getListBrandRequest = () => ({
  type: GET_LIST_BRAND_REQUEST,
});

export const getListBrandSuccess = payload => ({
  type: GET_LIST_BRAND_SUCCESS,
  payload: payload,
});

export const getListBrandFailed = payload => ({
  type: GET_LIST_BRAND_FAILED,
  payload: payload,
});
