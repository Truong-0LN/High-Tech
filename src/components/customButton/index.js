import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {scale, verticalScale} from '../../utils/scale';
import {AppTheme, TextStyles} from '../../config/AppTheme';

const CustomButton = ({
  leftIcon,
  containerStyles,
  textStyles,
  title,
  disabled,
  onPress,
  onPressOut,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      disabled={disabled}
      onPressOut={onPressOut}
      onPress={onPress}>
      {leftIcon && (
        <SvgXml
          xml={leftIcon}
          width={scale(24)}
          height={scale(24)}
          style={{marginLeft: scale(20)}}
        />
      )}
      <Text style={[TextStyles.textButton, styles.textTitle, textStyles]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: verticalScale(57),
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: AppTheme.Colors.Blue,
    alignItems: 'center',
    elevation: 2,
    shadowColor: AppTheme.Colors.Puple,
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  textTitle: {
    width: '100%',
    position: 'absolute',
    flex: 1,
    textAlign: 'center',
  },
});
