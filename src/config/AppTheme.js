import {Dimensions, Platform, NativeModules, StyleSheet} from 'react-native';
import {scale} from '../utils/scale';

const StatusBarManager = NativeModules;

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const textFontFamily = 'Poppins-';
const AppTheme = {
  Fonts: {
    Regular: `${textFontFamily}Regular`,
    Medium: `${textFontFamily}Medium`,
    SemiBold: `${textFontFamily}SemiBold`,
    Bold: `${textFontFamily}Bold`,
  },
  Colors: {
    Blue: '#40BFFF',
    Red: '#FB7181',
    Yellow: '#FFC833',
    Green: '#53D1B6',
    Puple: '#5C61F4',
    Dark: '#223263',
    Grey: '#9098B1',
    Light: '#EBF0FF',
    White: '#FFFFFF',
    Black: '#000000',
    SecondBackround: '#f2f2f2',
  },
  FontSize: {
    Small: scale(12),
    SmallX: scale(14),
    Medium: scale(16),
    Large: scale(18),
  },
  Dimensions: {
    windowHeight,
    windowWidth,
    statusBarHeight,
  },
};

const TextStyles = StyleSheet.create({
  headingText1: {
    fontSize: scale(32),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
  },
  headingText2: {
    fontSize: scale(24),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  headingText3: {
    fontSize: scale(20),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  textButton: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.White,
    fontWeight: '700',
  },
  bodyTextLargeLight: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Medium,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
  },
  bodyTextMediumBold: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
  },
  bodyTextMediumLight: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Medium,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
  },
  linkText: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Blue,
    fontWeight: '700',
  },
  textStyleInput: {
    fontSize: scale(15),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '600',
  },
  textStyleErrors: {
    fontSize: scale(15),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Red,
    fontWeight: '700',
  },
});

export {TextStyles, AppTheme};
