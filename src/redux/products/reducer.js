import {
  GET_ALL_FAVORITE_PRODUCT_REQUEST,
  GET_ALL_FAVORITE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_BY_TYPE_FAILED,
  GET_ALL_PRODUCTS_BY_TYPE_SUCCESS,
  GET_ALL_PRODUCTS_FAILED,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from './actionType';

const initialState = {
  products: [],
  product: {},
  productsByType: [],
  listFavorite: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_SUCCESS:
      return {...state, products: action?.payload};
    case GET_PRODUCT_REQUEST:
      return {...state, product: {}};
    case GET_PRODUCT_SUCCESS:
      return {...state, product: action?.payload};
    case GET_ALL_PRODUCTS_BY_TYPE_SUCCESS:
      return {
        ...state,
        productsByType: action?.payload.productsByType,
      };
    case GET_ALL_FAVORITE_PRODUCT_SUCCESS:
      return {
        ...state,
        listFavorite: action?.payload.listFavorite,
      };
    default:
      return {...state};
  }
};

export default productsReducer;
