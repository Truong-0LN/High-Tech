import {
  GET_CHOOSE_GEAR_FAILED,
  GET_CHOOSE_GEAR_SUCCESS,
  GET_LIST_CATEGORIES_FAILED,
  GET_LIST_CATEGORIES_REQUEST,
  GET_LIST_CATEGORIES_SUCCESS,
  GET_LIST_GEAR_FAILED,
  GET_LIST_GEAR_REQUEST,
  GET_LIST_GEAR_SUCCESS,
} from './actionType';

const initialState = {
  listCategories: [],
};
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CATEGORIES_REQUEST:
      return {...state};
    case GET_LIST_CATEGORIES_SUCCESS:
      return {...state, listCategories: action?.payload.data};
    case GET_LIST_CATEGORIES_FAILED:
      return {...state};
    default:
      return {...state};
  }
};

export default categoriesReducer;
