import {
  GET_ALL_FAVORITE_PRODUCT_FAILED,
  GET_ALL_FAVORITE_PRODUCT_REQUEST,
  GET_ALL_FAVORITE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_BY_TYPE_FAILED,
  GET_ALL_PRODUCTS_BY_TYPE_REQUEST,
  GET_ALL_PRODUCTS_BY_TYPE_SUCCESS,
  GET_ALL_PRODUCTS_FAILED,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from './actionType';
///////////////////////////////////////////////// get all product //////////////////////////////////////////////////
export const getAllProductsRequest = payload => ({
  type: GET_ALL_PRODUCTS_REQUEST,
  payload: payload,
});
export const getAllProductsSuccess = payload => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: payload,
});
export const getAllProductsFailed = payload => ({
  type: GET_ALL_PRODUCTS_FAILED,
  payload: payload,
});
////////////////////////////////////////// get product by type -> category /////////////////////////////////////////////////////////
export const getAllProductsByTypeRequest = (payload, onSuccess) => ({
  type: GET_ALL_PRODUCTS_BY_TYPE_REQUEST,
  payload: payload,
  onSuccess: onSuccess,
});
export const getAllProductsByTypeSuccess = payload => ({
  type: GET_ALL_PRODUCTS_BY_TYPE_SUCCESS,
  payload: payload,
});
export const getAllProductsByTypeFailed = payload => ({
  type: GET_ALL_PRODUCTS_BY_TYPE_FAILED,
  payload: payload,
});
//////////////////////////////////////// get product by id ///////////////////////////////////////////////////////////
export const getProductRequest = payload => ({
  type: GET_PRODUCT_REQUEST,
  payload: payload,
});
export const getProductSuccess = payload => ({
  type: GET_PRODUCT_SUCCESS,
  payload: payload,
});
export const getProductFailed = payload => ({
  type: GET_PRODUCT_FAILED,
  payload: payload,
});
//////////////////////////////////////////// get all favorite product ///////////////////////////////////////////////////////
export const getAllFavoriteProductRequest = () => ({
  type: GET_ALL_FAVORITE_PRODUCT_REQUEST,
});
export const getAllFavoriteProductSuccess = payload => ({
  type: GET_ALL_FAVORITE_PRODUCT_SUCCESS,
  payload: payload,
});
export const getAllFavoriteProductFailed = payload => ({
  type: GET_ALL_FAVORITE_PRODUCT_FAILED,
  payload: payload,
});
