import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

export const styles = StyleSheet.create({
  icon: {
    marginLeft: scale(10),
  },
  viewTextInput: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    alignItems: 'center',
  },
  scrollContainerHotProduct: {
    marginTop: verticalScale(10),
  },
  scrollViewHotProduct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: scale(16),
    justifyContent: 'space-between',
    paddingHorizontal: scale(22)
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
    paddingHorizontal: scale(16),
    alignItems: 'flex-end',
    height: verticalScale(30),
  },
  textMore: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Large,
    fontFamily: AppTheme.Fonts.Bold,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  containerCategories: {
    marginTop: 12,
    backgroundColor: AppTheme.Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  body: {
    backgroundColor: AppTheme.Colors.White,
    flex: 1,
    paddingBottom: 0,
    paddingTop: verticalScale(20),
  },
  margins: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: verticalScale(236),
    marginTop: verticalScale(20),
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
});
