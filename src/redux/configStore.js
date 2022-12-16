import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import logger from 'redux-logger';
import persistStore from 'redux-persist/es/persistStore';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './rootReducer';
import rootSaga from './rootSaga';

let middlewares = [];
const sagaMiddleware = createSagaMiddleware();

middlewares = [...middlewares, sagaMiddleware, logger];

const middleware = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, middleware);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
