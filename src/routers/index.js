import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomNavigator from './bottomNavigator';
import {AuthNavigation} from './authNavigation';
import SplashScreen from '../screens/splash';
import Notification from '../screens/notification';
import Favorites from '../screens/favorite';
import ProductDetail from '../screens/productDetail';
import ListProduct from '../screens/listProduct';
import MyAddress from '../screens/account/address';
import Profile from '../screens/account/profile';
import MyOrder from '../screens/account/order';
import Payment from '../screens/account/payment';
import OrderDetail from '../screens/account/orderDetail';
import {useDispatch, useSelector} from 'react-redux';
import {getDeviceTokenSelector, getIsLoginSelector} from '../redux/auth/selector';
import messaging from '@react-native-firebase/messaging';
import onDisplayNotification from '../helpers/notifee';
import Location from '../screens/location';
import {Alert, BackHandler, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {postDeviceTokenRequest} from '../redux/notification/action';
import SearchScreen from '../screens/search';
import SettingAddress from '../screens/account/address/SettingAddress';
import {getChangeLoading} from '../redux/loading/selector';
import MyLoading from '../components/loading';
import {getUserInfoRequest} from '../redux/auth/action';
const {Navigator, Screen, Group} = createNativeStackNavigator();

export default function AppRouter() {
  const isLogin = useSelector(getIsLoginSelector);
  const dispatch = useDispatch();
  const token = useSelector(getDeviceTokenSelector);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled && token === '') {
      const fcmToken = await messaging().getToken();
      dispatch(postDeviceTokenRequest(fcmToken));
    }
  }
  useEffect(() => {
    isLogin && dispatch(getUserInfoRequest());
    requestUserPermission();
    messaging().onMessage(remoteMessage => {
      try {
        console.log('firebase -> ',remoteMessage);
        let title = remoteMessage.data?.title;
        let body = remoteMessage.data?.title;
        onDisplayNotification(title, body);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  useEffect(() => {
    async function requestLocationPermission() {
      if (Platform.OS === 'ios') {
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
        Geolocation.requestAuthorization();
      }

      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('location yes');
          } else {
            console.log('location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
    requestLocationPermission();
  }, []);

  const loading = useSelector(getChangeLoading);
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen">
        <Screen name="SplashScreen" component={SplashScreen} />
        <Screen
          name="MainNavigation"
          component={isLogin ? BottomNavigator : AuthNavigation}
        />
        <Screen name="Notification" component={Notification} />
        <Screen name="Favorites" component={Favorites} />
        <Screen name="ProductDetail" component={ProductDetail} />
        <Screen name="ListProduct" component={ListProduct} />
        <Screen name="MyAddress" component={MyAddress} />
        <Screen name="Profile" component={Profile} />
        <Screen name="MyOrder" component={MyOrder} />
        <Screen name="Payment" component={Payment} />
        <Screen name="OrderDetail" component={OrderDetail} />
        <Screen name="Location" component={Location} />
        <Screen name="SearchScreen" component={SearchScreen} />
        <Screen name="SettingAddress" component={SettingAddress} />
      </Navigator>
      {loading && <MyLoading />}
    </NavigationContainer>
  );
}
