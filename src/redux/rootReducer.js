import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {PersistConfig, persistReducer} from 'redux-persist';
import productsReducer from './products/reducer';
import categoriesReducer from './categories/reducer';
import gearReducer from './gear/reducer';
import bannerReducer from './banner/reducer';
import authReducer from './auth/reducer';
import cartReducer from './cart/reducer';
import locationReducer from './location/reducer';
import loadingReducer from './loading/reducer';
import notificationReducer from './notification/reducer';
import brandReducer from './brand/reducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
const gearPersistConfig = {
  key: 'gear',
  storage: AsyncStorage,
};
const locationPersistConfig = {
  key: 'location',
  storage: AsyncStorage,
};


export const rootReducer = combineReducers({
  productsReducer,
  categoriesReducer,
  gear: persistReducer(gearPersistConfig, gearReducer),
  bannerReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  cartReducer,
  locationReducer,
  loadingReducer,
  notificationReducer,
  brandReducer,
});
