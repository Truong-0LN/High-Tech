import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale, verticalScale} from '../../../utils/scale';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../../assets/icons';
import {AppTheme} from '../../../config/AppTheme';
import IMAGES from '../../../assets/images';

const ItemCategories = ({title, icon, onPress, _id, type, containerStyle}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(_id, type)}
      style={styles.container}>
      <View style={[styles.viewIcon, containerStyle]}>
        {icon ? (
          <Image source={{uri: icon}} style={styles.img} />
        ) : (
          <Image source={IMAGES.ALL} style={styles.img} />
        )}
      </View>
      <Text numberOfLines={2} style={styles.textTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ItemCategories);

const styles = StyleSheet.create({
  img: {
    width: scale(40),
    height: scale(40),
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.Black,
    fontFamily: AppTheme.Fonts.Medium,
    textAlign: 'center',
  },
  viewIcon: {
    width: scale(80),
    height: scale(80),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: AppTheme.Colors.Light,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.Colors.White,
    elevation: 2,
    shadowColor: AppTheme.Colors.Black,
    shadowOpacity: 0.5,

    shadowRadius: 100,
  },
  container: {
    width: scale(90),
    height: verticalScale(128),
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: scale(10),
    backgroundColor: AppTheme.Colors.White,
  },
});
