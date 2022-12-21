import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  textName: {
    fontSize: scale(18),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    width: '90%',
  },
  viewName: {
    width: '100%',
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppTheme.Colors.White,
    paddingTop: verticalScale(18),
    borderTopWidth: 1,
    borderColor: AppTheme.Colors.Light
  },
  viewStar: {
    flexDirection: 'row',
    width: scale(100),
    marginLeft: scale(16),
    marginTop: scale(9),
  },
  iconStar: {
    marginRight: scale(3),
  },
  viewPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: verticalScale(14),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    backgroundColor: AppTheme.Colors.White,
  },
  textLastPrice: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Medium,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Grey,
    textDecorationLine: 'line-through',
  },
  textDiscount: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Medium,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    marginLeft: scale(10),
  },
  text: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Regular,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Black,
  },
  textPrice: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  viewDescription: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
    backgroundColor: AppTheme.Colors.White,
  },
  viewSelectMore: {
    flexDirection: 'row',
    width: '100%',
    height: verticalScale(100),
    paddingHorizontal: scale(16),
    marginTop: verticalScale(20),
  },
  imgChooseMore: {
    width: scale(90),
    height: scale(90),
    borderRadius: 3,
    marginRight: scale(4),
  },
  viewTitle: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
  },
  viewDiscount: {
    width: '100%',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(14),
  },
  textMore: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Blue,
  },

  textPolicy: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Blue,
    paddingLeft: scale(16),
    marginTop: verticalScale(20),
    fontWeight: '700',
  },
  textPromo: {
    fontSize: scale(15),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Black,
    lineHeight: 21.5,
    marginLeft: scale(16),
  },

  viewButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(16),
  },
  button: {
    flex: 1,
    marginLeft: scale(20),
    borderRadius: 40,
    marginVertical: verticalScale(10),
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  viewSpecifications: {
    paddingHorizontal: scale(16),
    backgroundColor: AppTheme.Colors.White,
    elevation: 2,
    shadowColor: AppTheme.Colors.Black,
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  boxMiniStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSeeMore: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    fontWeight: '700',
  },
  viewComment: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(10),
  },
  viewAlso: {
    width: '100%',
    paddingHorizontal: scale(16),
    flexDirection: 'row',
  },
  fdl: {
    flexDirection: 'row',
  },
  ViewPolicy: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  btnAddToCart: {
    width: scale(200),
    height: verticalScale(50),
  },
  viewContent: {
    backgroundColor: AppTheme.Colors.White,
    marginTop: verticalScale(10),
    paddingBottom: verticalScale(20),
  },
  textTitleSpecifications: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    width: scale(130),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(5),
    textAlignVertical: 'center',
  },
  textContentSpecifications: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '500',
    flex: 1,
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(5),
    borderLeftWidth: 2,
    borderColor: AppTheme.Colors.Grey,
  },
  textTitleSame: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    fontWeight: '700',
    paddingLeft: scale(16),
    marginVertical: verticalScale(14),
  },
  img: {
    width: '100%',
    height: verticalScale(236),
    borderWidth: 0.5,
    borderColor: AppTheme.Colors.Light,
  },
  itemImage: {
    height: verticalScale(216),
    width: Dimensions.get('window').width - 32,
    borderRadius: 5,
  },
  dotInActive: {
    backgroundColor: AppTheme.Colors.White,
    width: scale(20),
    height: verticalScale(6),
  },
  dotActive: {
    backgroundColor: AppTheme.Colors.Blue,
    width: scale(20),
    height: verticalScale(6),
  },
  viewCarousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.Colors.White,
    borderRadius: 5,
    paddingHorizontal: scale(16)
  },
  itemProductStyle:{
    marginRight: scale(12)
  },
  textQuantity: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    fontWeight: '700',
    paddingLeft: scale(16),
    marginVertical: verticalScale(10)
  },
});
