import {
  GET_USER_INFO_FAILED,
  GET_USER_INFO_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
} from '../auth/actionType';
import {
  GET_LIST_BRAND_FAILED,
  GET_LIST_BRAND_SUCCESS,
} from '../brand/actionType';
import {
  GET_LIST_CATEGORIES_FAILED,
  GET_LIST_CATEGORIES_SUCCESS,
} from '../categories/actionType';
import {
  GET_CHOOSE_GEAR_FAILED,
  GET_CHOOSE_GEAR_SUCCESS,
} from '../gear/actionType';
import {GET_NOTIFICATION_SUCCESS} from '../notification/actionType';
import {
  GET_ALL_CATEGORIES_BY_TYPE_FAILED,
  GET_ALL_CATEGORIES_BY_TYPE_SUCCESS,
  GET_ALL_CATEGORIES_FAILED,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_FAVORITE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_BY_TYPE_FAILED,
  GET_ALL_PRODUCTS_BY_TYPE_SUCCESS,
  GET_ALL_PRODUCTS_FAILED,
  GET_ALL_PRODUCTS_SUCCESS,
} from '../products/actionType';
import {
  GET_CHANGE_LOADING_FAILED,
  GET_CHANGE_LOADING_REQUEST,
  GET_CHANGE_LOADING_SUCCESS,
} from './actionType';

const initialState = {
  loading: false,
};
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANGE_LOADING_REQUEST:
      return {...state, loading: true};
    case GET_CHANGE_LOADING_SUCCESS:
      return {...state, loading: false};
    case GET_CHANGE_LOADING_FAILED:
      return {...state, loading: false};
    case LOGIN_SUCCESS:
      return {...state, loading: false};
    case LOGIN_FAILED:
      return {...state, loading: false};
    case GET_ALL_FAVORITE_PRODUCT_SUCCESS:
      return {...state, loading: false};
    case GET_NOTIFICATION_SUCCESS:
      return {...state, loading: false};
    case GET_ALL_CATEGORIES_BY_TYPE_SUCCESS:
      return {...state, loading: false};
    case GET_ALL_CATEGORIES_BY_TYPE_FAILED:
      return {...state, loading: false};
    case GET_ALL_PRODUCTS_BY_TYPE_SUCCESS:
      return {...state, loading: false};
    case GET_ALL_PRODUCTS_BY_TYPE_FAILED:
      return {...state, loading: false};
    case GET_LIST_CATEGORIES_SUCCESS:
      return {...state, loading: false};
    case GET_LIST_CATEGORIES_FAILED:
      return {...state, loading: false};
    case GET_CHOOSE_GEAR_SUCCESS:
      return {...state, loading: false};
    case GET_CHOOSE_GEAR_FAILED:
      return {...state, loading: false};
    case GET_USER_INFO_SUCCESS:
      return {...state, loading: false};
    case GET_USER_INFO_FAILED:
      return {...state, loading: false};
    case GET_ALL_CATEGORIES_SUCCESS:
      return {...state, loading: false};
    case GET_ALL_CATEGORIES_FAILED:
      return {...state, loading: false};
    case GET_ALL_PRODUCTS_SUCCESS:
      return {...state, loading: false};
    case GET_ALL_PRODUCTS_FAILED:
      return {...state, loading: false};
    case GET_LIST_BRAND_SUCCESS:
      return {...state, loading: false};
    case GET_LIST_BRAND_FAILED:
      return {...state, loading: false};
    case SIGN_UP_SUCCESS:
      return {...state, loading: false};
    case SIGN_UP_FAILED:
      return {...state, loading: false};
    default:
      return {...state};
  }
};

export default loadingReducer;
