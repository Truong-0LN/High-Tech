import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  getNotificationApi,
  postDeviceTokenApi,
} from '../../services/api/notification';
import {getNotificationSuccess, postDeviceTokenSuccess} from './action';
import {
  GET_NOTIFICATION_REQUEST,
  POST_DEVICE_TOKEN_REQUEST,
} from './actionType';

function* postDeviceTokenHandle(action) {
 
  try {
    const res = yield call(postDeviceTokenApi, {deviceToken: action?.payload});
    yield put(postDeviceTokenSuccess(res.data.deviceToken));
  } catch (error) {
    yield put(getChangeLoadingSuccess());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!'
    })
  }
}

//////////////////////////////// get notification /////////////////////////////////////////////

function* getNoticationHandle() {
  try {
    const res = yield call(getNotificationApi);
    yield put(getNotificationSuccess(res.data));
  } catch (error) {
    yield put(getChangeLoadingSuccess());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!'
    })
  }
}

////////////////////////// notification saga //////////////////////////
function* notificationSaga() {
  yield all([takeLatest(POST_DEVICE_TOKEN_REQUEST, postDeviceTokenHandle)]);
  yield all([takeLatest(GET_NOTIFICATION_REQUEST, getNoticationHandle)]);
}

export default notificationSaga;
