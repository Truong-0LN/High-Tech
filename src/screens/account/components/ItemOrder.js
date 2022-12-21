import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppTheme} from '../../../config/AppTheme';
import {scale, verticalScale} from '../../../utils/scale';
import {formatMoney} from '../../../helpers/formatMoney';
import {format} from 'date-fns';
const ItemOrder = ({onPress, order}) => {
  let day = format(new Date(order?.createdAt), 'MM/dd/yyyy');
  let total = 0 ;
   order?.items.map(i=>{
    total += i?.quantity;
   });
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.textTitle}>Thông tin đơn hàng</Text>
      <View style={styles.viewDate}>
        <Text style={styles.textDate}>Đặt hàng ngày: </Text>
        <Text style={styles.textDate}>{day}</Text>
      </View>
      <View style={styles.fdl}>
        <Text style={styles.textDate}>Trạng thái</Text>
        <Text style={styles.textDate}>{order?.message}</Text>
      </View>
      <View style={styles.fdl}>
        <Text style={styles.textDate}>Sản phẩm</Text>
        <Text style={styles.textDate}>{total} sản phẩm</Text>
      </View>
      <View style={styles.fdl}>
        <Text style={styles.textDate}>Tổng cộng</Text>
        <Text style={styles.textPrice}>{formatMoney(order?.totalPrice)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ItemOrder);

const styles = StyleSheet.create({
  viewDate: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    borderBottomWidth: 0.2,
    borderColor: AppTheme.Colors.Grey,
    paddingBottom: verticalScale(10),
    paddingHorizontal: scale(14),
  },
  fdl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(14),
  },
  textPrice: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  textDate: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Medium,
    color: AppTheme.Colors.Black,
  },
  container: {
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: AppTheme.Colors.Light,
    borderRadius: 5,
    elevation: 2,
    shadowColor: AppTheme.Colors.Black,
    shadowOpacity: 0.5,
    backgroundColor: AppTheme.Colors.White,
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(14),
    shadowRadius: 15,
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
});
