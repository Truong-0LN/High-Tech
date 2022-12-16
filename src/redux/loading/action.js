import {
  GET_CHANGE_LOADING_FAILED,
  GET_CHANGE_LOADING_REQUEST,
  GET_CHANGE_LOADING_SUCCESS,
} from './actionType';

////////////////////////////// get change loading//////////////////////////////////////  //////////////

export const getChangeLoadingRequest = () => ({
  type: GET_CHANGE_LOADING_REQUEST,
});

export const getChangeLoadingSuccess = payload => ({
  type: GET_CHANGE_LOADING_SUCCESS,
  payload: payload,
});
export const getChangeLoadingFailed = payload => ({
  type: GET_CHANGE_LOADING_FAILED,
  payload: payload,
});
