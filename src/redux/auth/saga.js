import jwtDecode from 'jwt-decode';
import {ToastAndroid} from 'react-native';
import {call, put, all, takeLatest} from 'redux-saga/effects';
import {showModal} from '../../components/customNotiModal';
import {removeToken, setToken} from '../../helpers/tokenHelper';
import {
  getUserInfoApi,
  loginRequestApi,
  regsiterRequestApi,
} from '../../services/api/auth';
import {
  getUserInfoFailed,
  getUserInfoSuccess,
  loginFailed,
  loginSuccess,
  logoutSuccess,
  signUpFailed,
  signUpSuccess,
} from './action';
import {
  GET_USER_INFO_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGN_UP_REQUEST,
} from './actionType';
///////////////////////////////// login //////////////////////////////////////////
function* loginHandle(action) {
  const {payload, onSuccess} = action;
  try {
    const res = yield call(loginRequestApi, {
      email: payload?.email,
      password: payload?.password,
      deviceToken: payload?.deviceToken,
    });
    onSuccess?.(action);
    setToken(res?.data.token);
    yield put(
      loginSuccess({
        email: res?.data.email,
        fullname: res?.data.fullname,
        phone: res?.data.phone,
        isLogin: true,
        token: res?.data.token,
      }),
    );
  } catch (error) {
    yield put(loginFailed());
    ToastAndroid.show(
      'Đăng nhập thất bại ' + error?.response.data?.message,
      ToastAndroid.LONG,
    );

  }
}
///////////////////////////////// register  //////////////////////////////////////////

function* signUpHanlde(action) {
  const {payload, onSuccess} = action;
  try {
    const res = yield call(regsiterRequestApi, {
      email: payload?.email,
      password: payload?.password,
      fullname: payload?.fullname,
      phone: payload?.phone,
    });
    onSuccess?.(action);
    yield put(signUpSuccess(res));
  } catch (error) {
    yield put(signUpFailed());
    ToastAndroid.show(
      `Đăng kí thất bại ${ error?.response.data?.message}` ,
      ToastAndroid.LONG,
    );
  }
}
///////////////////////////////// logout  //////////////////////////////////////////

function* logoutHandle(action) {
  const {onSuccess} = action;
  try {
    onSuccess?.(action);
    removeToken();
    yield put(logoutSuccess());
  } catch (error) {
  }
}
///////////////////////////////// get user info ///////////////////////////////
function* getUserInfohandle() {
  try {
    const res = yield call(getUserInfoApi);
    yield put(getUserInfoSuccess(res.data));
  } catch (error) {
    yield put(getUserInfoFailed());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!',
    })
  }
}
function* authSaga() {
  yield all([takeLatest(LOGIN_REQUEST, loginHandle)]);
  yield all([takeLatest(SIGN_UP_REQUEST, signUpHanlde)]);
  yield all([takeLatest(LOGOUT_REQUEST, logoutHandle)]);
  yield all([takeLatest(GET_USER_INFO_REQUEST, getUserInfohandle)]);
}

export default authSaga;
