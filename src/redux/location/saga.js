import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  getChangeAddressSuccess,
  getChangeShippingAddressFailed,
  getChangeShippingAddressSuccess,
  getChooseLocationSuccess,
  getDeleteAddressSuccess,
} from './action';
import {
  GET_CHANGE_ADDRESS_REQUEST,
  GET_CHOOSE_LOCATION_REQUEST,
  GET_DELETE_ADDRESS_REQUEST,
} from './actionType';

///////////////////////////////// get change one address //////////////////////////////////
function* getChangeOneAddressHandle(action) {
  try {
   
    yield put(getChangeShippingAddressSuccess({
      shippingAddress: action?.payload,
    }));
  } catch (error) {
    yield put(getChangeShippingAddressFailed());
    yield put(getChangeLoadingSuccess());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!'
    })
  }
}
///////////////////////////////// get delete one address //////////////////////////////////

function* getDeleteOneAddressHandle(action) {
  try {
    yield getDeleteAddressSuccess({
      listLocation: action.payload.listLocation,
    });
  } catch (error) {
    yield put(getChangeLoadingSuccess());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!'
    })
  }
}
///////////////////////////////// get choose one address from list location //////////////////////////////////

function* chooseLocationHandle(action) {
  try {
    yield put(
      getChooseLocationSuccess({
        location: {
          address: action.payload.address,
          lat: action.payload.lat,
          long: action.payload.long,
        },
      }),
    );
  } catch (error) {
    yield put(getChangeLoadingSuccess());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!'
    })
  }
}
//////////////////////////////// function saga //////////////////////////////////////////////////////////////////
function* locationSaga() {
  yield all([takeLatest(GET_CHOOSE_LOCATION_REQUEST, chooseLocationHandle)]);
  yield all([
    takeLatest(GET_CHANGE_ADDRESS_REQUEST, getChangeOneAddressHandle),
  ]);
  yield all([
    takeLatest(GET_DELETE_ADDRESS_REQUEST, getDeleteOneAddressHandle),
  ]);
}

export default locationSaga;
