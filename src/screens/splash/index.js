import {StyleSheet, View, Image, Text} from 'react-native';
import React, {useEffect} from 'react';
import {AppTheme} from '../../config/AppTheme';
import IMAGES from '../../assets/images';
import {scale, verticalScale} from '../../utils/scale';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    let timer;
    const directionalNavigation = async () => {
      timer = setTimeout(() => {
        navigation.replace('MainNavigation');
      }, 1000);
    };
    directionalNavigation();
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={IMAGES.Logo} resizeMode="contain" style={styles.img} />
      <Text style={styles.textLogo}>HighTech</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  textLogo: {
    fontWeight: '700',
    fontSize: scale(26),
    color: AppTheme.Colors.Dark,
    marginTop: verticalScale(16),
  },
  img: {
    width: scale(84),
    height: scale(84),
  },
  container: {
    backgroundColor: AppTheme.Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
