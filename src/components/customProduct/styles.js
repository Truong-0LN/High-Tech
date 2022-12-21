import {StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';
export const styles = StyleSheet.create({
  container: {
    width: scale(176),
    padding: scale(16),
    borderRadius: 5,
    borderColor: AppTheme.Colors.Light,
    borderWidth: 1,
    marginBottom: verticalScale(9),
    backgroundColor: AppTheme.Colors.White,
    elevation: 4,
    shadowColor: AppTheme.Colors.White,
    shadowOpacity: 0.9,
    shadowRadius: 40,
  },

  img: {
    width: scale(133),
    height: scale(133),
    borderRadius: 5,
    alignSelf: 'center',
  },
  textName: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
    marginTop: verticalScale(8),
  },
  viewStar: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  fld: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(4),
  },
  viewSale: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLastPrice: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
    marginTop: verticalScale(8),
  },
  textFirstPrice: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Medium,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Grey,
    fontWeight: '300',
    textDecorationLine: 'line-through',
    marginRight: scale(4),
  },
  textSale: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    fontWeight: '600',
  },
});
