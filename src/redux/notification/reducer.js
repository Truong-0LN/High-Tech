import {
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  POST_DEVICE_TOKEN_SUCCESS,
} from './actionType';

const initialState = {
  
  listNotification: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        listNotification: action.payload,
      };
    
    default:
      return {
        ...state,
      };
  }
};

export default notificationReducer;
