import {StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  viewTop: {
    width: scale(200),
    height: verticalScale(3),
    backgroundColor: AppTheme.Colors.Dark,
    alignSelf: 'center',
    borderRadius: 15
  },
  textTitle: {
    alignSelf: 'center',
    marginBottom: verticalScale(36),
  },
  textInput: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: AppTheme.Colors.Dark,
    borderRadius: 8,
    color: AppTheme.Colors.Dark,
    fontFamily: AppTheme.Fonts.SemiBold,
    fontWeight: '700'
  },
  viewTextInput: {
    flex: 3,
  },
  viewButton: {
    flex: 1,
    paddingTop: verticalScale(10)
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  centerView: {
    flex: 5.2,
    backgroundColor: AppTheme.Colors.White,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10)
  },
  touch: {
    flex: 3,
  },
  buttonStyle: {
    height: verticalScale(45),
    borderRadius: scale(8),
    backgroundColor: AppTheme.Colors.Dark,
    marginTop: verticalScale(20),
  },
  textName: {
    fontFamily: AppTheme.Fonts.SemiBold,
    fontWeight: '700',
    color: AppTheme.Colors.Dark,
    fontSize: AppTheme.FontSize.Large,
    letterSpacing: 0.5,
    marginTop: verticalScale(12),
  },
  textEmail: {
    fontFamily: AppTheme.Fonts.Regular,
    color: AppTheme.Colors.Dark,
    fontSize: AppTheme.FontSize.Medium,
    marginTop: verticalScale(8),
  },
  img: {
    width: scale(152),
    height: scale(152),
    borderRadius: 80,
  },
  avatar: {
    paddingTop: verticalScale(60),
    alignItems: 'center',
    paddingBottom: verticalScale(16),
    paddingHorizontal: scale(24),
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
    paddingTop: verticalScale(24),
    borderTopWidth: 0.5,
    borderColor: AppTheme.Colors.Dark,
    marginTop: verticalScale(36),
    paddingHorizontal: scale(24),
  },
});
