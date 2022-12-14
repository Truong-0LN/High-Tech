import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppTheme} from '../../../config/AppTheme';
import {scale, verticalScale} from '../../../utils/scale';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../../components/header';
import ProducOnCart from '../../../components/customProductOnCart';
import {getCancleOrder, getOrderById} from '../../../services/api/order';
import {useState} from 'react';
import {showModal} from '../../../components/customNotiModal';
import {formatMoney} from '../../../helpers/formatMoney';
import {format} from 'date-fns';
import {useDispatch} from 'react-redux';
import {
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../../redux/loading/action';

const OrderDetail = props => {
  const {orderId} = props.route?.params;
  const isFocused = useIsFocused();
  const [order, setOrder] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChangeLoadingRequest());
    getOrderById(orderId)
      .then(res => {
        dispatch(getChangeLoadingSuccess());
        setOrder(res.data);
      })
      .catch(error => {
        dispatch(getChangeLoadingSuccess());

        showModal({
          title: 'Có lỗi xảy ra!!!',
          message: 'Xin vui lòng thử lại sau',
        });
      });
  }, [orderId, isFocused]);
  const dayCreate = order?.createdAt;
  const onCancle = () => {
    dispatch(getChangeLoadingRequest());

    if (order?.message === 'Đơn hàng đã bị hủy') {
      dispatch(getChangeLoadingSuccess());

      return showModal({
        title: 'Đon hàng này đã bị hủy',
        onConfirmPress: () => navigation.goBack(),
      });
    }
    getCancleOrder(orderId, {
      status: 'Cancelled',
    })
      .then(res => {
        dispatch(getChangeLoadingSuccess());

        showModal({
          title: 'Hủy đơn hàng thành công',
          onConfirmPress: () => navigation.goBack(),
        });
      })
      .catch(error => {
        dispatch(getChangeLoadingSuccess());
        showModal({
          title: 'Có lỗi gì đó xảy ra!!!',
          onConfirmPress: () => navigation.goBack(),
        });
      });
  };
  return (
    <View style={styles.container}>
      <Header title="Chi tiết đơn hàng" iconBack />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{
          paddingBottom: verticalScale(40),
        }}
        showsHorizontalScrollIndicator={false}>
        {order?.items.map((item, index) => {
          return (
            <ProducOnCart key={index} item={item} noDeleted={true} noUpdate />
          );
        })}
        <View style={styles.viewInfomation}>
          <View style={styles.fdl}>
            <Text style={styles.text}>Tổng tiền</Text>
            <Text style={styles.textTitle}>
              {formatMoney(order?.totalPrice)}
            </Text>
          </View>
          <View style={styles.fdl}>
            <Text style={styles.text}>Phương thức thanh toán</Text>
            <Text style={styles.textTitle}>
              {order?.paymentMethod === 'COD' ? 'Tiền mặt' : 'ZaloPay'}
            </Text>
          </View>
          <View style={styles.fdl}>
            <Text style={styles.text}>Đặt ngày</Text>
            <Text style={styles.textTitle}>
              {dayCreate && format(new Date(dayCreate), 'HH:mm dd-MM-yyyy')}
            </Text>
          </View>
          <View style={styles.fdl}>
            <Text style={styles.text}>Địa chỉ nhận hàng:</Text>
            <Text
              style={[
                styles.textTitle,
                {width: scale(220), textAlign: 'right'},
              ]}
              numberOfLines={4}>
              {order?.shippingAddress?.address}
            </Text>
          </View>
          <View style={styles.fdl}>
            <Text style={styles.text}>Đã thanh toán</Text>
            <Text style={styles.textTitle} numberOfLines={4}>
              {order?.isPaid ? 'Đã thanh toán' : 'Chưa Thanh toán'}
            </Text>
          </View>
          <View style={styles.fdl}>
            <Text style={styles.text}>Trạng thái đơn hàng</Text>
            <Text
              style={[
                styles.textTitle,
                {
                  width: scale(200),
                  textAlign: 'right',
                  color:
                    order?.message === 'Đơn hàng đã bị hủy'
                      ? AppTheme.Colors.Red
                      : AppTheme.Colors.Dark,
                },
              ]}
              numberOfLines={4}>
              {order?.message}
            </Text>
          </View>
          <View style={styles.fdl}>
            <Text style={styles.text}>SĐT</Text>
            <Text style={styles.textTitle} numberOfLines={4}>
              {order?.phone}
            </Text>
          </View>
        </View>
        {order?.status === 'Not Processed' && (
          <TouchableOpacity style={styles.touchCancle} onPress={onCancle}>
            <Text style={styles.textCancle}>Hủy đơn hàng</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  touchCancle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(200),
    alignSelf: 'center',
  },
  textCancle: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    marginVertical: verticalScale(16),
  },
  fdl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewInfomation: {
    backgroundColor: AppTheme.Colors.White,
    elevation: 2,
    shadowColor: AppTheme.Colors.Black,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(5),
    borderRadius: 2,
  },
  text2: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Grey,
    marginBottom: verticalScale(16),
    width: '40%',
    textAlign: 'left',
  },
  text: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Black,
    marginBottom: verticalScale(16),
  },
  textTitle: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    marginBottom: verticalScale(16),
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
