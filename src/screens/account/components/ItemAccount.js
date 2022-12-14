import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {scale, verticalScale} from '../../../utils/scale';
import {AppTheme} from '../../../config/AppTheme';

const ItemAccount = ({icon, title, onPress, containerStyle, textStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <SvgXml xml={icon} width={scale(24)} height={scale(24)} />
      <Text style={[styles.textTitle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ItemAccount;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    marginLeft: scale(24),
  },
  container: {
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    backgroundColor: AppTheme.Colors.White,
    marginBottom: verticalScale(14),
  },
});
