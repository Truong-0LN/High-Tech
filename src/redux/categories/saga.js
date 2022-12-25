import {call, put, all, takeLatest} from 'redux-saga/effects';
import {getAllCategoriesApi} from '../../services/api/categories';
import {getListCategoriesSuccess} from './action';
import {GET_LIST_CATEGORIES_REQUEST} from './actionType';

function* getListCategoriesHandle() {
  try {
    const res = yield call(getAllCategoriesApi);
    yield put(getListCategoriesSuccess(res));
  } catch (error) {
    yield put(getChangeLoadingSuccess());
    showModal({
      title: 'Có lỗi gì đó xảy ra !!!'
    })
  }
}

function* categoriesSaga() {
  yield all([takeLatest(GET_LIST_CATEGORIES_REQUEST, getListCategoriesHandle)]);
}
export default categoriesSaga;
