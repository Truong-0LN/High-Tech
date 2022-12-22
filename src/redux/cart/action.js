import {
  ADD_ONE_PRODUCT_TO_CART_FAILED,
  ADD_ONE_PRODUCT_TO_CART_REQUEST,
  ADD_ONE_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCTS_TO_CART_FAILED,
  ADD_PRODUCTS_TO_CART_REQUEST,
  ADD_PRODUCTS_TO_CART_SUCCESS,
  GET_ALL_CART_FAILED,
  GET_ALL_CART_REQUEST,
  GET_ALL_CART_SUCCESS,
  REMOVE_CART_FAILED,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
} from './actionType';

//////////////////////////////////////////////// add one product to cart  ///////////////////////////////////////
export const addOneProductToCartRequest = (payload, onSuccess) => ({
  type: ADD_ONE_PRODUCT_TO_CART_REQUEST,
  payload: payload,
  onSuccess: onSuccess,
});

export const addOneProductToCartSuccess = payload => ({
  type: ADD_ONE_PRODUCT_TO_CART_SUCCESS,
  payload: payload,
});
export const addOneProductToCartFailed = payload => ({
  type: ADD_ONE_PRODUCT_TO_CART_FAILED,
  payload: payload,
});
///////////////////////////////////////////////// add products to cart  //////////////////////////////////////

export const addProductsToCartRequest = payload => ({
  type: ADD_PRODUCTS_TO_CART_REQUEST,
  payload: payload,
});

export const addProductsToCartSuccess = payload => ({
  type: ADD_PRODUCTS_TO_CART_SUCCESS,
  payload: payload,
});
export const addProductsToCartFailed = payload => ({
  type: ADD_PRODUCTS_TO_CART_FAILED,
  payload: payload,
});
///////////////////////////////////////////////// get all cart  //////////////////////////////////////

export const getAllCartRequest = () => ({
  type: GET_ALL_CART_REQUEST,
});

export const getAllCartSuccess = payload => ({
  type: GET_ALL_CART_SUCCESS,
  payload: payload,
});
export const getAllCartFailed = payload => ({
  type: GET_ALL_CART_FAILED,
  payload: payload,
});

///////////////////////////////////////////////// remove cart  //////////////////////////////////////

export const removeCartRequest = payload => ({
  type: REMOVE_CART_REQUEST,
  payload: payload,
});

export const removeCartSuccess = payload => ({
  type: REMOVE_CART_SUCCESS,
  payload: payload,
});
export const removeCartFailed = payload => ({
  type: REMOVE_CART_FAILED,
  payload: payload,
});
