import {
  ADD_ONE_PRODUCT_TO_CART_REQUEST,
  ADD_ONE_PRODUCT_TO_CART_SUCCESS,
  GET_ALL_CART_FAILED,
  GET_ALL_CART_SUCCESS,
  GET_CHOOSE_BANNER_FAILED,
  GET_CHOOSE_BANNER_SUCCESS,
  GET_LIST_BANNER_FAILED,
  GET_LIST_BANNER_REQUEST,
  GET_LIST_BANNER_SUCCESS,
} from './actionType';

const initialState = {
  listCart: [],
  message: '',
};
const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        message: action?.payload,
      };
    ///////////////////////////////////////////////////////////////////////////
    case GET_ALL_CART_SUCCESS:
      return {...state, listCart: action?.payload.listCart};
    case GET_ALL_CART_FAILED:
      return {...state};
    default:
      return {...state};
  }
};

export default bannerReducer;
