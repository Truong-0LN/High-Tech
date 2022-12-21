import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import IMAGES from '../../assets/images';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../assets/icons';
import {scale} from '../../utils/scale';
import {formatMoney, formatMoney2} from '../../helpers/formatMoney';
import PlaceholderProductOnHome from '../placeholderProductOnHome';

const CustomProduct = ({
  title,
  costPrice,
  image,
  salePercent,
  salePrice,
  remove,
  onGoDetail,
  onRemove,
  containerStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onGoDetail}>
      <View>
        {image && (
          <Image
            source={{uri: image.toString()}}
            resizeMode="cover"
            style={styles.img}
          />
        )}
      </View>
      <Text style={styles.textName} numberOfLines={2}>
        {title}
      </Text>
      {salePrice && (
        <Text style={styles.textLastPrice}>{formatMoney(salePrice)}</Text>
      )}
      <View style={styles.fld}>
        <View style={styles.viewSale}>
          <Text style={styles.textFirstPrice}>{formatMoney(costPrice)}</Text>
          <Text style={styles.textSale}> {salePercent}%</Text>
        </View>
        {remove && (
          <TouchableOpacity>
            <SvgXml
              xml={AppIcon.IconRemove}
              width={scale(24)}
              height={scale(24)}
              style={styles.iconRemove}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomProduct;