import {Dimensions, Platform, StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: AppTheme.Colors.White,
  },
  viewTextInput: {
    paddingHorizontal: scale(10),
    marginTop: verticalScale(20),
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  body: {
    position: 'absolute',
    marginTop: verticalScale(60),
    width: '100%',
    height: 100,
    zIndex: 200,
  },
  mapViewContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 10,
    position: 'absolute',
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: scale(371),
    height: verticalScale(55),
    backgroundColor: AppTheme.Colors.Dark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
    padding: scale(10),
    marginBottom: verticalScale(10),
  },
  loadingStyle: {
    width: scale(300),
    height: verticalScale(300),
    alignSelf: 'center',
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.5,
    zIndex: 10,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  indicatorBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerStyle: {
    zIndex: 100,
    backgroundColor: AppTheme.Colors.White,
    borderBottomWidth: 0.3,
    borderBottomColor: AppTheme.Colors.TextPlace,
  },

  listPlaces: {
    marginHorizontal: scale(20),
    zIndex: 100,
    backgroundColor: AppTheme.Colors.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 6,
    marginTop: verticalScale(2)
  },
  itemPlaces: {
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
    marginHorizontal: scale(15),
  },
  textPlaces: {
    fontSize: AppTheme.FontSize.Small,
    fontFamily: AppTheme.Fonts.Regular,
    color: AppTheme.Colors.Black,
    flex: 1,
    marginLeft: scale(5),
  },
  textBtnStyle: {
    fontSize: AppTheme.FontSize.Medium,
    color: AppTheme.Colors.White,
  },
  viewCurrentPosition: {
    backgroundColor: AppTheme.Colors.White,
    zIndex: 100,
    width: scale(40),
    height: scale(40),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    bottom: verticalScale(40),
    left: scale(-20),
  },
  viewFooter: {
    zIndex: 100,
    position: 'absolute',
    alignSelf: 'center',
    bottom: verticalScale(0),
    alignItems: 'flex-end',
  },
  address: {
    marginLeft: scale(15),
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    borderBottomWidth: 0.5,
    borderColor: AppTheme.Colors.Gray,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  fld: {
    flexDirection: 'row',
  },
  iconAddress: {
    top: verticalScale(7),
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Black,
  },
  text: {
    fontSize: AppTheme.FontSize.SmallX,
    fontFamily: AppTheme.Fonts.Medium,
    color: AppTheme.Colors.Gray,
    width: scale(300),
  },
  touchLocation: {
    marginBottom: verticalScale(20),
  },
  textHeaderModal: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Black,
    textAlign: 'center',
  },
});
