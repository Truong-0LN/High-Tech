import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getAllBrandApi} from '../../services/api/brand';
import {getListBrandFailed, getListBrandSuccess} from './action';
import {GET_LIST_BRAND_REQUEST} from './actionType';

function* getListBrandHandle() {
  try {
    const res = yield call(getAllBrandApi);
    yield put(getListBrandSuccess({listBrand: res.data}));
  } catch (error) {
    console.log('get list brand handle error ', error);
    yield put(getListBrandFailed());
  }
}

function* brandSaga() {
  yield all([takeLatest(GET_LIST_BRAND_REQUEST, getListBrandHandle)]);
}
export default brandSaga;
