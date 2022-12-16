import {View, Platform, Alert, BackHandler} from 'react-native';
import React, { useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Explore from '../screens/explore';
import Cart from '../screens/cart';
import Account from '../screens/account';
import {scale, verticalScale} from '../utils/scale';
import AppIcon from '../assets/icons/index';
import {SvgXml} from 'react-native-svg';
import {TextStyles, AppTheme} from '../config/AppTheme';
import Notification from '../screens/notification';
import Favorites from '../screens/favorite';

const {Navigator, Screen, Group} = createBottomTabNavigator();
export default function BottomNavigator({navigation}) {
  const heightBottom =
    Platform.OS === 'ios' ? verticalScale(75) : verticalScale(65);
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('GUVI!', 'Bạn có muốn thoát khỏi ứng dụng?', [
          {
            text: 'Hủy',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Đồng ý', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);
  return (
    <Navigator
      initialRouteName="Home"
      
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: '100%',
          height: heightBottom,
          paddingBottom: verticalScale(7),
        },
        tabBarActiveTintColor: AppTheme.Colors.Blue,
        tabBarInactiveTintColor: AppTheme.Colors.Grey,
        tabBarHideOnKeyboard: true,
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <SvgXml
                xml={focused ? AppIcon.IconHomeBlue : AppIcon.IconHometGrey}
                width={scale(22)}
                height={scale(22)}
              />
            );
          },
        }}
      />
      <Screen
        name="Build PC"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <SvgXml
                xml={focused ? AppIcon.IconCustomBlue : AppIcon.IconCustom}
                width={scale(26)}
                height={scale(26)}
              />
            );
          },
        }}
      />
      <Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <SvgXml
                xml={focused ? AppIcon.IconCartBlue : AppIcon.IconCartGrey}
                width={scale(22)}
                height={scale(22)}
              />
            );
          },
        }}
      />
      <Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <SvgXml
                xml={
                  focused ? AppIcon.IconAccountBlue : AppIcon.IconAccountGrey
                }
                width={scale(22)}
                height={scale(22)}
              />
            );
          },
        }}
      />
    </Navigator>
  );
}
