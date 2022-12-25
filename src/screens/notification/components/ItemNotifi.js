import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {AppTheme} from '../../../config/AppTheme';
import {scale, verticalScale} from '../../../utils/scale';
import {format} from 'date-fns';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../../assets/icons';

const ItemNotifi = ({title, description, date_created,onPress}) => {
  const day = format(new Date(date_created), 'dd-MM/yyyy');
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <SvgXml width={scale(24)} height={scale(24)} xml={AppIcon.IconSuccess} />
      <View style={styles.viewDescription}>
        <Text style={styles.textTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.textDay}>Ngày {day} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemNotifi;

const styles = StyleSheet.create({
  viewDescription: {
    flex: 1,
    marginLeft: scale(12),
  },
  textDay: {
    fontSize: AppTheme.FontSize.SmallX,
    color: AppTheme.Colors.Black,
    fontFamily: AppTheme.Fonts.Regular,
    marginTop: scale(6),
  },
  text: {
    fontSize: AppTheme.FontSize.SmallX,
    color: AppTheme.Colors.Black,
    fontFamily: AppTheme.Fonts.Regular,
    marginTop: scale(6),
    lineHeight: 17,
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.Dark,
    fontFamily: AppTheme.Fonts.SemiBold,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    minHeight: verticalScale(60),
    borderBottomWidth: 1,
    borderColor: AppTheme.Colors.Dark,
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
});
