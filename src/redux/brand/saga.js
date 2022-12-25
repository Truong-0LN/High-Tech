import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getAllBrandApi} from '../../services/api/brand';
import {getListBrandFailed, getListBrandSuccess} from './action';
import {GET_LIST_BRAND_REQUEST} from './actionType';

function* getListBrandHandle() {
  try {
    const res = yield call(getAllBrandApi);
    yield put(getListBrandSuccess({listBrand: res.data}));
  } catch (error) {
    yield put(getListBrandFailed());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!'
    });
  }
}

function* brandSaga() {
  yield all([takeLatest(GET_LIST_BRAND_REQUEST, getListBrandHandle)]);
}
export default brandSaga;
