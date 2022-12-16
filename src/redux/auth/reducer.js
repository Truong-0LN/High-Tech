import { POST_DEVICE_TOKEN_SUCCESS } from '../notification/actionType';
import {
  GET_USER_INFO_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from './actionType';

const initialState = {
  token: '',
  user: {
    email: '',
    phone: '',
    fullname: '',
    information: [],
    gender: 0,
    avatar: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
  },
  isLogin: false,
  deviceToken: '',
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action?.payload.token,
        isLogin: action?.payload.isLogin,
        user: {
          email: action?.payload.email,
          phone: action?.payload.phone,
          fullname: action?.payload.fullname,
        },
      };
    case LOGIN_FAILED:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: '',
        isLogin: false,
        user: {},
      };
    case SIGN_UP_REQUEST:
      return {...state};
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action?.payload.token,
        isLogin: action?.payload.isLogin,
        user: action?.payload.user,
      };
    case SIGN_UP_FAILED:
      return {...state};
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action?.payload,
      };
      case POST_DEVICE_TOKEN_SUCCESS:
      return {
        ...state,
        deviceToken: action.payload,
      };
    default:
      return {...state};
  }
};

export default authReducer;
