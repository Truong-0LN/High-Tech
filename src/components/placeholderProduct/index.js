import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from '../../utils/scale';

const PlaceholderProduct = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.itemSke}></View>
        <View style={styles.item2Ske}></View>
        <View style={styles.itemSke}></View>
        <View style={styles.item2Ske}></View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default PlaceholderProduct;

const styles = StyleSheet.create({
  item2Ske: {
    width: '100%',
    height: verticalScale(300),
    marginTop: verticalScale(20),
    borderRadius: 10,
  },
  itemSke: {
    width: '100%',
    height: verticalScale(40),
    borderRadius: 10,
    marginTop: verticalScale(20)
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16)
  },
});
