import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from '../../utils/scale';

const PlaceholderListBanner = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          width: '90%',
          height: verticalScale(216),
          borderRadius: scale(10),
          alignSelf: 'center',
          marginBottom: 20,
        }}
      />
    </SkeletonPlaceholder>
  );
};

export default PlaceholderListBanner;
