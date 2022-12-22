import {useDispatch} from 'react-redux';
import {call, put, all, takeLatest} from 'redux-saga/effects';
import {
  getAllProductsApi,
  getAllProductsByTypeApi,
  getMyFavoriteApi,
  getProductApi,
} from '../../services/api/products';
import {getChangeLoadingSuccess} from '../loading/action';
import {getChangeLoading} from '../loading/selector';
import {
  getAllFavoriteProductSuccess,
  getAllProductsByTypeRequest,
  getAllProductsByTypeSuccess,
  getAllProductsFailed,
  getAllProductsSuccess,
  getProductSuccess,
} from './action';
import {
  GET_ALL_FAVORITE_PRODUCT_REQUEST,
  GET_ALL_PRODUCTS_BY_TYPE_REQUEST,
  GET_ALL_PRODUCTS_REQUEST,
  GET_PRODUCT_REQUEST,
} from './actionType';
///////////////////////////////// get all product //////////////////////////////////////////////////
function* getAllProductsHandle() {
  try {
    const res = yield call(getAllProductsApi);
    yield put(getAllProductsSuccess(res.data.data));
  } catch (error) {
    yield put(getAllProductsFailed({error}));
  }
}
///////////////////////////////// get product by id //////////////////////////////////////////////////

function* getProductHandle(action) {
  const {payload} = action;
  try {
    const res = yield call(getProductApi, action?.payload);
    yield put(getProductSuccess(res?.data));
    yield put(getChangeLoadingSuccess());
  } catch (error) {
    console.log('getProductHandle =>', error);
    yield put(getChangeLoadingSuccess());
    // yield put(getProductFailed({error}));
  }
}
///////////////////////////////// get product by type ////////////////////////////////
function* getProductByTypeHandle(action) {
  const {payload, onSuccess} = action;
  try {
    const res = yield call(getAllProductsByTypeApi, payload);
    yield put(getAllProductsByTypeSuccess({productsByType: res?.data}));
    onSuccess?.(action);
  } catch (error) {
    console.log('getProductByTypeHandle -> ', error);
  }
}
///////////////////////////////// get all favorite product ////////////////////////////////
function* getAllFavoriteProductHandle(action) {
  const {payload, onSuccess} = action;
  try {
    const res = yield call(getMyFavoriteApi);
    yield put(getAllFavoriteProductSuccess({listFavorite: res?.data}));
  } catch (error) {
    console.log('getAllFavoriteProductHandle -> ', error);
  }
}
///////////////////////////////// saga //////////////////////////////////////////////////
function* productsSaga() {
  yield all([takeLatest(GET_ALL_PRODUCTS_REQUEST, getAllProductsHandle)]);
  yield all([takeLatest(GET_PRODUCT_REQUEST, getProductHandle)]);
  yield all([
    takeLatest(GET_ALL_PRODUCTS_BY_TYPE_REQUEST, getProductByTypeHandle),
  ]);
  yield all([
    takeLatest(GET_ALL_FAVORITE_PRODUCT_REQUEST, getAllFavoriteProductHandle),
  ]);
}

export default productsSaga;
