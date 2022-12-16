import {all, fork} from 'redux-saga/effects';
import productsSaga from '../redux/products/saga';
import authSaga from './auth/saga';
import bannerSaga from './banner/saga';
import categoriesSaga from './categories/saga';
import gearSaga from './gear/saga';
import cartSaga from './cart/saga';
import locationSaga from './location/saga';
import loadingSaga from './loading/saga';
import notificationSaga from './notification/saga';
import brandSaga from './brand/saga';
export default function* rootSaga() {
  yield all([fork(productsSaga)]);
  yield all([fork(categoriesSaga)]);
  yield all([fork(gearSaga)]);
  yield all([fork(authSaga)]);
  yield all([fork(bannerSaga)]);
  yield all([fork(cartSaga)]);
  yield all([fork(locationSaga)]);
  yield all([fork(loadingSaga)]);
  yield all([fork(notificationSaga)]);
  yield all([fork(brandSaga)]);
}
