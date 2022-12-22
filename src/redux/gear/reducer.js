import {
  GET_CHOOSE_GEAR_FAILED,
  GET_CHOOSE_GEAR_SUCCESS,
  GET_LIST_GEAR_FAILED,
  GET_LIST_GEAR_REQUEST,
  GET_LIST_GEAR_SUCCESS,
} from './actionType';

const initialState = {
  listGear: [],
};
const gearReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_GEAR_REQUEST:
      return {...state};
    case GET_LIST_GEAR_SUCCESS:
      return {...state, listGear: action?.payload};
    case GET_LIST_GEAR_FAILED:
      return {...state};
    ///////////////////////////////////////////////////////////////////////////
    case GET_CHOOSE_GEAR_SUCCESS:
      return {...state, listGear: action?.payload};
    case GET_CHOOSE_GEAR_FAILED:
      return {...state};
    default:
      return {...state};
  }
};

export default gearReducer;
