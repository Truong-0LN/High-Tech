import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, memo} from 'react';
import {scale, verticalScale} from '../../utils/scale';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../assets/icons';
import IMAGES from '../../assets/images';
import {AppTheme} from '../../config/AppTheme';

const ItemReview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.viewAvatar}>
        <Image
          source={IMAGES.Avatar}
          style={styles.imgAvatar}
          resizeMode="cover"
        />
        <View style={styles.viewName}>
          <Text style={styles.textName}>Lam Truong</Text>
          <View style={styles.viewStar}>
            {star.map(item => {
              return (
                <SvgXml
                  key={item.id}
                  xml={AppIcon.IconStar}
                  width={scale(14)}
                  height={scale(14)}
                  style={styles.iconStar}
                />
              );
            })}
          </View>
        </View>
      </View>

      <Text style={styles.textCmt}>
        air max are always very comfortable fit, clean and just perfect in every
        way. just the box was too small and scrunched the sneakers up a little
        bit, not sure if the box was always this small but the 90s are and will
        always be one of my favorites.
      </Text>
      <View style={styles.viewImg}>
        {images.map((item, index) => {
          return (
            <TouchableOpacity key={index}>
              <Image
                source={{uri: item}}
                style={styles.img}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.textCreateDate}>10-10-2022</Text>
    </View>
  );
};

export default memo(ItemReview);

const styles = StyleSheet.create({
  textCreateDate: {
    fontSize: scale(13),
    fontFamily: AppTheme.Fonts.Regular,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Grey,
  },
  viewImg: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  img: {
    width: scale(72),
    height: scale(72),
    borderRadius: 2,
    marginRight: scale(7),
  },
  textCmt: {
    fontSize: scale(14),
    fontFamily: AppTheme.Fonts.Medium,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    textAlign: 'justify',
    lineHeight: 18,
  },
  textName: {
    fontSize: scale(16),
    fontFamily: AppTheme.Fonts.Bold,
    letterSpacing: 0.5,
    color: AppTheme.Colors.Dark,
    fontWeight: '700',
  },
  viewName: {
    marginLeft: scale(16),
    paddingVertical: verticalScale(3),
  },
  viewAvatar: {
    flexDirection: 'row',
  },
  imgAvatar: {
    width: scale(48),
    borderRadius: 50,
    height: scale(48),
  },
  container: {
    flex: 1,
    paddingVertical: verticalScale(3),
    marginBottom: verticalScale(9),
    borderBottomWidth: 1,
    borderColor: AppTheme.Colors.Light,
  },
  iconStar: {
    marginRight: scale(3),
  },
  viewStar: {
    flexDirection: 'row',
    width: scale(100),
    marginTop: scale(5),
  },
});

const star = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];
const images = [
  'https://product.hstatic.net/1000026716/product/asus_tuf_gaming_geforce_gtx_1660_super_oc_edition_6gb_gddr6_-_thumb_74f252ffec834364a83d0dada79c568c.jpg',
  'https://product.hstatic.net/1000026716/product/gearvn-asus-tuf-gaming-geforce-gtx-1660-super-oc-edition-6gb-gddr6-12_0ece8cc24de14255a4091cce3f5a8917.png',
];
