import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {scale, verticalScale} from '../../../utils/scale';
import {AppTheme} from '../../../config/AppTheme';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../../assets/icons';
import IMAGES from '../../../assets/images';
import {formatMoney} from '../../../helpers/formatMoney';

const ItemChooseGear = ({item, onDelete, onOpenModal, index}) => {
  return !item.category ? (
    <TouchableOpacity onPress={onOpenModal} style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          source={{uri: item?.icon}}
          resizeMode="cover"
          style={styles.img}
        />
      </View>

      <View style={styles.viewDescription}>
        <Text style={styles.textName}>{item?.title}</Text>
        <Text style={styles.text}>Nhấn để chọn linh kiện</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onOpenModal} style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          source={{uri: item?.images[0]}}
          resizeMode="cover"
          style={styles.img}
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.textName}>{item?.title}</Text>
        <View style={styles.viewFdl}>
          <View>
            {item?.salePercent && (
              <View style={styles.viewCostPrice}>
                <Text style={styles.textCostPrice}>
                  {formatMoney(item?.costPrice)}
                </Text>
                <Text style={styles.textSale}>{item?.salePercent}%</Text>
              </View>
            )}
            <Text style={styles.textSalePrice}>
              {formatMoney(item?.salePrice)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onDelete(index)}>
            <SvgXml
              xml={AppIcon.IconDelete}
              width={scale(28)}
              height={scale(28)}
              style={{right: scale(10), top: scale(10)}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ItemChooseGear);

const styles = StyleSheet.create({
  viewFdl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewInfo: {
    marginLeft: scale(10),
    width: scale(265),
  },
  textName: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  textSalePrice: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  textCostPrice: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Grey,
    textDecorationLine: 'line-through',
  },
  textSale: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Red,
    fontWeight: '700',
    marginLeft: scale(7),
  },
  viewCostPrice: {
    flexDirection: 'row',
  },
  text: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Medium,
    color: AppTheme.Colors.Grey,
  },
  textName: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  viewDescription: {
    marginLeft: scale(10),
    justifyContent: 'space-between',
  },
  viewImage: {
    width: scale(80),
    height: verticalScale(90),
    marginHorizontal: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.Colors.White,
    borderRadius: 10,
  },
  img: {
    width: scale(60),
    height: scale(60),
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  container: {
    width: '100%',
    minHeight: verticalScale(100),
    backgroundColor: AppTheme.Colors.White,
    marginBottom: verticalScale(16),
    elevation: 2,
    shadowColor: AppTheme.Colors.White,
    shadowOffset:{
      width: 0,
      height: 4,
    },
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    shadowOpacity: 0.1,
    borderWidth: 0.1,
    borderRadius: 2
  },
});
