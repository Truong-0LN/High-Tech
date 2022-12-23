import {View, Text, Image, ScrollView} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {styles} from './styles';
import ItemAccount from './components/ItemAccount';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserSelector} from '../../redux/auth/selector';
import CustomButton from '../../components/customButton';
import AppIcon from '../../assets/icons';
import {getUserInfoRequest, logoutRequest} from '../../redux/auth/action';
import {showModal} from '../../components/customNotiModal';

const Account = () => {
  const navigation = useNavigation();
  const userInfo = useSelector(getUserSelector);
  const [visibled, setVisibled] = useState(false);
  const [email, setEmail] = useState(userInfo.email);
  const [fullname, setFullname] = useState(userInfo.fullname);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, []);
  const onGo = value => {
    switch (value) {
      case 'Tài khoản':
        navigation.navigate('Profile');
        break;
      case 'Đơn hàng':
        navigation.navigate('MyOrder');
        break;
      case 'Địa chỉ':
        navigation.navigate('MyAddress', {isDelete: true, fromTo: 'account'});
        break;
      case 'Liên kết':
        navigation.navigate('Payment');
        break;
      case 'Thông báo':
        navigation.navigate('Notification');
        break;
      default:
        break;
    }
  };
  const onUpdate = useCallback(() => {
    setVisibled(false);
  }, []);
  const onLogout = useCallback(() => {
    dispatch(logoutRequest(() => navigation.navigate('SplashScreen')));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatar}>
        <Image source={{uri: userInfo?.avatar}} style={styles.img} />
        <Text style={styles.textName}>{userInfo.fullname}</Text>
        <Text style={styles.textEmail}>{userInfo.email}</Text>
        <CustomButton
          title={'Chỉnh sửa thông tin'}
          onPress={() => navigation.navigate('Profile')}
          containerStyles={styles.buttonStyle}
        />
      </View>
      <View style={styles.body}>
        <ItemAccount
          icon={AppIcon.IconOrder}
          title="Đơn hàng"
          onPress={() => onGo('Đơn hàng')}
        />
        <ItemAccount
          icon={AppIcon.IconAddress}
          onPress={() => onGo('Địa chỉ')}
          title="Địa chỉ"
        />
        <ItemAccount
          icon={AppIcon.IconNotification}
          onPress={() => onGo('Thông báo')}
          title="Thông báo"
        />
        <ItemAccount
          icon={AppIcon.IconPayment}
          onPress={() =>
            showModal({
              title: 'Tính năng chưa được hổ trợ',
            })
          }
          title="Liên kết thẻ"
        />
        <ItemAccount icon={AppIcon.IconHelp}
         onPress={() =>
          showModal({
            title: 'Tính năng chưa được hổ trợ',
          })
        }
        title="Trợ giúp" />
        <ItemAccount
          icon={AppIcon.IconLogout}
          textStyle={{color: '#FF3D00'}}
          title="Đăng xuất"
          onPress={onLogout}
        />
      </View>
    </ScrollView>
  );
};

export default Account;
