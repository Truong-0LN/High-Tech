import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getChangeLoadingSuccess} from './action';
import {
  GET_CHANGE_LOADING_REQUEST,
  
} from './actionType';

function* getChangeLoading(action) {
  try {
    // yield put(getChangeLoadingSuccess(action.payload));
  } catch (error) {
    console.log('getChangeLoading -> ', error);
  }
}

function* loadingSaga() {
  yield all([takeLatest(GET_CHANGE_LOADING_REQUEST, getChangeLoading)]);
}

export default loadingSaga;
