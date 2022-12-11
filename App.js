import {Alert} from 'react-native';
import React, {useEffect} from 'react';
import AppRouter from './src/routers';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/configStore';
import CustomNotiModal from './src/components/customNotiModal';
import CodePush from 'react-native-code-push';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <CustomNotiModal />
        <AppRouter />
    
      </PersistGate>
    </Provider>
  );
};

export default CodePush(App);
