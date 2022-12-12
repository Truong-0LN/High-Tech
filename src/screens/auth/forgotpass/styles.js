import {StyleSheet} from 'react-native';
import {AppTheme} from '../../../config/AppTheme';
import {scale, verticalScale} from '../../../utils/scale';

export const styles = StyleSheet.create({
  containerLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 10,
    marginTop: verticalScale(40),
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: AppTheme.Colors.White,
  },

  loadingStyle: {
    width: scale(200),
    height: verticalScale(200),
    alignSelf: 'center',
    marginBottom: verticalScale(40),
  },
  textCode:{
    textAlign: 'center',
    fontSize: AppTheme.FontSize.Large,
    color: AppTheme.Colors.Blue,
    marginBottom: verticalScale(20),
    fontWeight: '700'
  },
  viewCode:{
  },
  root: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30)
  },
  cell: {
    width: scale(50),
    height: scale(50),
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: AppTheme.Colors.Grey,
    textAlign: 'center',
    borderRadius: 4
  },
  focusCell: {
    borderColor: AppTheme.Colors.Blue,
  },
  text: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.Dark,
    marginBottom: verticalScale(20),

  },
  textLine: {
    width: scale(160),
    borderBottomWidth: 1,
    borderColor: AppTheme.Colors.Grey,
  },
  viewOr: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(40),
  },
  textOR: {
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.Grey,
    fontWeight: '700',
    marginHorizontal: scale(20),
    top: verticalScale(10),
  },
  textBack: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.Grey,
    fontWeight: '700',
    marginBottom: verticalScale(40),
  },
  textTitle: {
    textAlign: 'center',
    marginTop: verticalScale(30),
    fontSize: AppTheme.FontSize.Large,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    marginBottom: verticalScale(40),
  },
  textRegister: {
    color: AppTheme.Colors.Black,
    opacity: 0.8,
  },

  containerRegister: {
    backgroundColor: AppTheme.Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.SecondBackround,
    paddingHorizontal: scale(16),
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
});
