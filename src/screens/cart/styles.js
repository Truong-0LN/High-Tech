import {StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  containerStyle:{
    backgroundColor: AppTheme.Colors.Grey
  },
  welcomeHead: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  ////////////////////////////////////////////////
  textNoSupport:{
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    textAlign:'center',
    marginBottom: verticalScale(15)
  },
  touchPayment: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(10),
    borderWidth: 0.5,
    borderColor: AppTheme.Colors.Dark,
    paddingHorizontal: scale(16),
    borderRadius: scale(6),
  },
  textPaymentMethod: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  textMethod: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
  },
  textChooseMethod: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    marginLeft: scale(16)
  },
  touchPaymentMethod: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: AppTheme.Colors.Dark,
    borderRadius: 6,
    marginVertical: verticalScale(14),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    justifyContent: 'space-between',
    backgroundColor: AppTheme.Colors.White,
  },
  textHeader: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  modalHeader: {
    paddingTop: verticalScale(20),
    alignSelf: 'center',
  },
  touchModal: {
    flex: 4,
  },
  centerView: {
    minHeight: verticalScale(190),
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(20)
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgb(225,225,225,0.6)',
  },
  body: {
    paddingVertical: verticalScale(20),
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  footer: {
    backgroundColor: AppTheme.Colors.White,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    borderRadius: 6,
    elevation: 2,
  },
  viewCode: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    borderColor: AppTheme.Colors.Light,
    borderRadius: 5,
  },
  touch: {
    backgroundColor: AppTheme.Colors.Blue,
    width: scale(87),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textTouch: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Medium,
    letterSpacing: 0.5,
    color: AppTheme.Colors.White,
  },
  viewTotalPrice: {
    borderColor: AppTheme.Colors.Light,
    borderWidth: 1,
    marginVertical: verticalScale(20),
    borderRadius: 5,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    backgroundColor: AppTheme.Colors.White,
    elevation: 2,
    shadowColor: AppTheme.Colors.Black,
  },
  viewFdl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  text: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Regular,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Black,
  },
  textInput: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(5),
    width: '75%',
    paddingLeft: scale(20),
  },
  textPriceTotal: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  textTotal: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
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
  noProduct: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
  textNoProduct: {
    fontSize: scale(18),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    marginBottom: verticalScale(40),
  },
  viewList: {
    paddingHorizontal: scale(16),
  },
  viewAddress: {
    width: '100%',
    minHeight: verticalScale(60),
    borderWidth: 0.5,
    borderColor: AppTheme.Colors.Grey,
    borderRadius: 6,
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
  },
  textChooseAddress: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.SemiBold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    textAlignVertical: 'center',
    marginTop: verticalScale(8),
  },
});
