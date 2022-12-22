import {GET_LIST_BRAND_SUCCESS} from './actionType';

const initialState = {
  listBrand: {},
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BRAND_SUCCESS:
      return {
        ...state,
        listBrand: action.payload.listBrand,
      };
    default:
      return {...state};
  }
};

export default brandReducer;
