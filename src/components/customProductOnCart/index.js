import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';
import IMAGES from '../../assets/images';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../assets/icons';
import {formatMoney} from '../../helpers/formatMoney';

const ProducOnCart = ({
  noDeleted,
  item,
  onUpdateQuantity,
  noUpdate,
  onPress,
}) => {
  const checkOutStock = item?.quantity > item?.product?.quantity;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.body}>
        <Image
          source={{uri: item?.product.images[0]}}
          resizeMode="cover"
          style={styles.img}
        />
        <View style={styles.main}>
          <View style={styles.viewName}>
            <Text numberOfLines={3} style={styles.textName}>
              {item?.product.title}
            </Text>
            <View style={styles.viewIcon}>
              {noDeleted ? null : (
                <TouchableOpacity
                  onPress={() => onUpdateQuantity(item.product._id, 0)}>
                  <SvgXml
                    xml={AppIcon.IconRemove}
                    width={scale(18)}
                    style={{marginLeft: scale(16)}}
                    height={scale(18)}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.viewPrice}>
            <View>
              {item.product.salePercent && (
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textCostPrice}>
                    {formatMoney(item.product.costPrice)}
                  </Text>
                  <Text style={styles.textSale}>
                    {''} {item.product.salePercent}%
                  </Text>
                </View>
              )}
              <Text style={styles.textPrice}>
                {formatMoney(item.product.salePrice)}
              </Text>
            </View>

            {noUpdate ? null : (
              <View style={[styles.viewPlus]}>
                <Pressable
                  onPress={() =>
                    checkOutStock
                      ? onUpdateQuantity(
                          item.product._id,
                          item?.product?.quantity,
                        )
                      : onUpdateQuantity(item.product._id, item?.quantity - 1)
                  }
                  style={styles.buttonSubtraction}>
                  <SvgXml
                    xml={AppIcon.IconMinus}
                    width={scale(13)}
                    height={scale(13)}
                  />
                </Pressable>
                <Text style={styles.textQuantity}>{item.quantity}</Text>
                <Pressable
                  onPress={() =>
                    checkOutStock
                      ? onUpdateQuantity(
                          item.product._id,
                          item?.product?.quantity,
                        )
                      : onUpdateQuantity(item.product._id, item?.quantity + 1)
                  }
                  style={styles.buttonAddition}>
                  <SvgXml
                    xml={AppIcon.IconPlus}
                    width={scale(13)}
                    height={scale(13)}
                  />
                </Pressable>
              </View>
            )}
          </View>
        </View>
        {noUpdate ? (
          <View style={styles.viewQuantity}>
            <Text style={styles.text}>X {item.quantity}</Text>
          </View>
        ) : null}
      </View>
      {checkOutStock && (
        <Text style={styles.textError}>Sản phẩm không đủ số lượng</Text>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ProducOnCart);

const styles = StyleSheet.create({
  textError: {
    fontSize: AppTheme.FontSize.SmallX,
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Red,
    marginTop: verticalScale(5),
    textAlign: 'right',
  },
  text: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Dark,
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
  },
  buttonAddition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.Colors.White,

    borderRadius: 4,
    marginLeft: scale(1),
    borderRadius: 4,
    elevation: 3,
    shadowColor: AppTheme.Colors.Black,
    shadowRadius: 4,
  },
  buttonSubtraction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    backgroundColor: AppTheme.Colors.White,
    marginRight: scale(1),
    borderRadius: 4,
    elevation: 3,
    shadowColor: AppTheme.Colors.Black,
    shadowRadius: 4,
  },
  textQuantity: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: AppTheme.Colors.Black,
    fontFamily: AppTheme.Fonts.Bold,
    fontSize: AppTheme.FontSize.Medium,
    backgroundColor: AppTheme.Colors.White,
    borderRadius: 4,
    elevation: 3,
    shadowColor: AppTheme.Colors.Black,
    shadowRadius: 4,
    marginHorizontal: scale(3),
  },
  viewPlus: {
    width: scale(104),
    height: verticalScale(34),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  viewIcon: {
    flexDirection: 'row',
  },
  textPrice: {
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  textName: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    maxWidth: '70%',
  },
  viewPrice: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
  },
  viewName: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  main: {
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: scale(12),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: scale(72),
    height: scale(72),
    borderRadius: 5,
  },
  container: {
    paddingVertical: verticalScale(12),
    borderRadius: 5,
    elevation: 2,
    shadowColor: AppTheme.Colors.Black,
    shadowOpacity: 0.5,
    backgroundColor: AppTheme.Colors.White,
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(14),
    shadowRadius: 15,
    // alignItems: 'center',
  },
});
