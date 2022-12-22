import {all, call, put, takeLatest} from 'redux-saga/effects';
import { showModal } from '../../components/customNotiModal';
import {
  addOneProductToCartApi,
  addProductsToCartApi,
  deleteProductOnCartApi,
  getCartApi,
} from '../../services/api/cart';
import {getChangeLoadingSuccess} from '../loading/action';
import {
  addOneProductToCartFailed,
  addOneProductToCartSuccess,
  getAllCartRequest,
  getAllCartSuccess,
} from './action';
import {
  ADD_ONE_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCTS_TO_CART_REQUEST,
  GET_ALL_CART_REQUEST,
  GET_CHOOSE_BANNER_REQUEST,
  GET_LIST_BANNER_REQUEST,
  REMOVE_CART_REQUEST,
} from './actionType';
///////////////////////////////// add one product to cart  //////////////////////////////
function* addOneProductToCartHandle(action) {
  const {payload, onSuccess} = action;
  try {
    const res = yield call(addOneProductToCartApi, action?.payload);
    onSuccess?.(action);
    yield put(addOneProductToCartSuccess(res?.message));
  } catch (error) {
    showModal({
      title: error.response?.data.message,
    })
    yield put(addOneProductToCartFailed());
    console.log('addOneProductToCartHandle -> ', error);
  }
}
///////////////////////////////// add list product to cart  //////////////////////////////
function* addProductsToCartHandle(action) {
  try {
    const res = yield call(addProductsToCartApi, action?.payload);
    console.log('res saga ', res);
  } catch (error) {
    console.log('addProductsToCart -> ', error);
  }
}
///////////////////////////////// get all cart  //////////////////////////////
function* getAllCartHandle() {
  try {
    const res = yield call(getCartApi);
    yield put(getAllCartSuccess({listCart: res?.data}));
    yield put(getChangeLoadingSuccess());
  } catch (error) {
    console.log('getAllCartHandle -> ', error);
    yield put(getChangeLoadingSuccess());
  }
}
///////////////////////////////// delete product on cart //////////////////////////////
function* deleteProductOnCartHandle(action) {
  const {onSuccess} = action;
  try {
    const res = yield call(deleteProductOnCartApi, action.payload);
    console.log('res -> ', res);
    onSuccess(action);
  } catch (error) {
    console.log('deleteProductOnCart -> ', error);
  }
}

function* cartSaga() {
  yield all([
    takeLatest(ADD_ONE_PRODUCT_TO_CART_REQUEST, addOneProductToCartHandle),
  ]);
  yield all([
    takeLatest(ADD_PRODUCTS_TO_CART_REQUEST, addProductsToCartHandle),
  ]);
  yield all([takeLatest(GET_ALL_CART_REQUEST, getAllCartHandle)]);

  yield all([takeLatest(REMOVE_CART_REQUEST, deleteProductOnCartHandle)]);
}

export default cartSaga;
