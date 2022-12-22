import {
  GET_LIST_CATEGORIES_FAILED,
  GET_LIST_CATEGORIES_REQUEST,
  GET_LIST_CATEGORIES_SUCCESS,
} from './actionType';

export const getListCategoriesRequest = () => ({
  type: GET_LIST_CATEGORIES_REQUEST,
});

export const getListCategoriesSuccess = payload => ({
  type: GET_LIST_CATEGORIES_SUCCESS,
  payload: payload,
});
export const getListCategoriesFailed = payload => ({
  type: GET_LIST_CATEGORIES_FAILED,
  payload: payload,
});
