import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getBannerApi} from '../../services/api/banner';
import {getListBannerSuccess} from './action';
import {GET_CHOOSE_BANNER_REQUEST, GET_LIST_BANNER_REQUEST} from './actionType';

function* getListBannerHandle() {
  try {
    const res = yield call(getBannerApi);
    yield put(getListBannerSuccess(res.data));
  } catch (error) {
    console.log('getListBannerHandle -> ', error);
  }
}
function* chooseBannerHandle(action) {
  try {
  } catch (error) {}
}

function* bannerSaga() {
  yield all([takeLatest(GET_CHOOSE_BANNER_REQUEST, chooseBannerHandle)]);
  yield all([takeLatest(GET_LIST_BANNER_REQUEST, getListBannerHandle)]);
}

export default bannerSaga;
