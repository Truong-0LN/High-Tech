import {StyleSheet} from 'react-native';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },
  container: {flex: 1, backgroundColor: AppTheme.Colors.White},
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(8)
  },
  itemContainer:{
    marginBottom: verticalScale(14)
  },
  text:{
    fontFamily: AppTheme.Fonts.Medium,
    fontSize: AppTheme.FontSize.Large,
    fontWeight: '700',
    color: AppTheme.Colors.Dark
  },
  containerEmpty:{
   width: '100%',
   height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(220),
  },
});
export default styles;
