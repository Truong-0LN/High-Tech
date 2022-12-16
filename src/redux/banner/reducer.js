import {
  GET_CHOOSE_BANNER_FAILED,
  GET_CHOOSE_BANNER_SUCCESS,
  GET_LIST_BANNER_FAILED,
  GET_LIST_BANNER_REQUEST,
  GET_LIST_BANNER_SUCCESS,
} from './actionType';

const initialState = {
  listBanner: [],
};
const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BANNER_REQUEST:
      return {...state};
    case GET_LIST_BANNER_SUCCESS:
      return {...state, listBanner: action?.payload};
    case GET_LIST_BANNER_FAILED:
      return {...state};
    ///////////////////////////////////////////////////////////////////////////
    case GET_CHOOSE_BANNER_SUCCESS:
      return {...state};
    case GET_CHOOSE_BANNER_FAILED:
      return {...state};
    default:
      return {...state};
  }
};

export default bannerReducer;
