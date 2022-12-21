import {StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {},
  containerTextInput: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: scale(18),
    borderRadius: scale(20),
    borderColor: AppTheme.Colors.Grey,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: scale(12),
    fontSize: 20,
  },
  textInputNoFocus: {
    borderWidth: 1,
    borderColor: AppTheme.Colors.Blue,
  },
  textError: {
    marginTop: verticalScale(8),
  },
});
