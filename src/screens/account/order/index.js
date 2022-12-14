import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header';
import ItemOrder from '../components/ItemOrder';
import {AppTheme} from '../../../config/AppTheme';
import {scale, verticalScale} from '../../../utils/scale';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getMyOrderApi} from '../../../services/api/order';
import Lottie from 'lottie-react-native';
import IMAGES from '../../../assets/images';
import {
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../../redux/loading/action';
import {showModal} from '../../../components/customNotiModal';

const MyOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listOrder, setListOrder] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && dispatch(getChangeLoadingRequest());
    isFocused &&
      getMyOrderApi()
        .then(res => {
          setListOrder(res.data);
          dispatch(getChangeLoadingSuccess());
        })
        .catch(e => {
          dispatch(getChangeLoadingSuccess());
          showModal({
            title: 'Oops!!',
            message: 'Có lỗi xảy ra!!!',
          });
        });
  }, [isFocused]);
  const onGoDetail = _id => {
    navigation.navigate('OrderDetail', {orderId: _id});
  };
  return (
    <View style={styles.container}>
      <Header title="Đơn hàng" iconBack />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{paddingBottom: verticalScale(20)}}>
        {listOrder?.length > 0 ? (
          <>
            {listOrder.reverse().map(item => {
              return (
                <ItemOrder
                  key={item._id}
                  order={item}
                  onPress={() => onGoDetail(item._id)}
                />
              );
            })}
          </>
        ) : (
          <View style={styles.emptyOrder}>
            <Text style={styles.text}>Chưa có đơn hàng nào</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  text:{
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.Dark,
    fontWeight: '700'
  },
  emptyOrder:{
    width: '100%',
    height: Dimensions.get('window').height /2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: verticalScale(60)
  },

  body: {
    backgroundColor: AppTheme.Colors.White,
    flex: 1,
    paddingHorizontal: scale(5),
    paddingTop: verticalScale(20),
  },
  container: {
    backgroundColor: AppTheme.Colors.White,
    flex: 1,
  },
});
