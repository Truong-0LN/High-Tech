import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../../../assets/icons';
import {scale, verticalScale} from '../../../../utils/scale';
import {AppTheme} from '../../../../config/AppTheme';

const ItemProfile = ({title, description, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.viewTitle}>
        {icon && (
          <SvgXml
            xml={icon || AppIcon.IconClose}
            width={scale(24)}
            height={scale(24)}
          />
        )}
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      {description && (
        <View style={styles.viewMore}>
          <Text style={styles.text}>{description}</Text>
          <SvgXml xml={AppIcon.IconMore} width={scale(20)} height={scale(20)} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemProfile;

const styles = StyleSheet.create({
  text: {
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Grey,
    fontSize: AppTheme.FontSize.Medium,
    marginRight: scale(16),
  },
  textTitle: {
    fontFamily: AppTheme.Fonts.Bold,
    fontWeight: '700',
    color: AppTheme.Colors.Dark,
    fontSize: AppTheme.FontSize.Large,
    marginLeft: scale(12),
  },
  viewTitle: {
    flexDirection: 'row',
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: AppTheme.Colors.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(10),
    elevation: 4,
    shadowColor: AppTheme.Colors.Black,
    shadowRadius: 15,
  },
});
