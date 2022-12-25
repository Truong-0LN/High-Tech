import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
  const [valid, setValid] = useState(true);
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onGoDetail}>
      <View>
        {image && (
          <Image
            onError={() => setValid(false)}
            source={{
              uri: valid
                ? image.toString()
                : 'https://lh3.googleusercontent.com/QvkjL4K3rTX5KnVT…72fU4zJf82mPVrJS5Wm9Wgz9CwrlPLb8Bo7cR8aLo=w500-rw',
            }}
            resizeMode="cover"
            style={styles.img}
          />
        )}
      </View>
      <Text style={styles.textName} numberOfLines={2}>
        {title}
      </Text>
      {/* {salePrice && (
        <Text style={styles.textLastPrice}>{formatMoney(1)}
        </Text>
      )} */}
      {salePercent > 0 ? (
        <Text style={styles.textLastPrice}>{formatMoney(salePrice)}</Text>
      ) : (
        <Text style={styles.textLastPrice}>{formatMoney(costPrice)}</Text>
      )}
      <View style={styles.fld}>
      { salePercent> 0 &&  <View style={styles.viewSale}>
          <Text style={styles.textFirstPrice}>{formatMoney(costPrice)}</Text>
          <Text style={styles.textSale}> {salePercent}%</Text>
        </View>}
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

export default React.memo(CustomProduct);
