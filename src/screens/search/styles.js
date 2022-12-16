import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  textEmpty: {
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.Dark,
    fontFamily: AppTheme.Fonts.SemiBold,
  },
  viewEmpty: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerTextInputStyle: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(20)

  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingBottom: verticalScale(15),
    paddingHorizontal: scale(8),
  },
  flatList: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    marginTop: verticalScale(3),
  },
  itemStyle: {
    marginBottom: verticalScale(0),
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
});
