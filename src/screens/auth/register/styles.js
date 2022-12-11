import {StyleSheet} from 'react-native';
import {AppTheme} from '../../../config/AppTheme';
import {scale, verticalScale} from '../../../utils/scale';

export const styles = StyleSheet.create({
  viewLogo: {
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(30),
  },
  textLogo: {
    fontWeight: '700',
    fontSize: scale(22),
    color: AppTheme.Colors.Dark,
    marginTop: verticalScale(10),
  },
  img: {
    width: scale(64),
    height: scale(64),
  },
  textBtn: {
    fontFamily: AppTheme.Fonts.Regular,
    color: AppTheme.Colors.Grey,
  },
  containerBtnGG: {
    backgroundColor: AppTheme.Colors.White,
    marginBottom: verticalScale(24),
    elevation: 5,
  },
  containerBtnFB: {
    backgroundColor: AppTheme.Colors.White,
    elevation: 5,
    marginBottom: verticalScale(24),
  },
  textOR: {
    fontSize: AppTheme.FontSize.Large,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Grey,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  viewOr: {
    height: 1,
    backgroundColor: AppTheme.Colors.Grey,
    flex: 2,
    opacity: 0.5,
  },
  containerOr: {
    flexDirection: 'row',
    marginBottom: verticalScale(24),
    alignItems: 'center',
  },

  containerBtn: {
    marginTop: verticalScale(24),
    marginBottom: verticalScale(24),
  },
  textBlue: {
    fontFamily: AppTheme.Fonts.Regular,
    color: AppTheme.Colors.Blue,
    textAlign: 'center',
    marginTop: verticalScale(16),
  },
  text: {
    fontFamily: AppTheme.Fonts.Regular,
    color: AppTheme.Colors.Grey,
    textAlign: 'center',
    marginTop: verticalScale(8),
  },
  textWelcome: {
    fontSize: AppTheme.FontSize.Large,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: verticalScale(16),
  },
  logo: {
    alignSelf: 'center',
    marginTop: verticalScale(40),
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
    paddingHorizontal: scale(16),
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
});
