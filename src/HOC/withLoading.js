import Lottie from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {getLoadingSelector} from '../redux/loading/selector';
import {scale, verticalScale} from '../utils/scale';

function withLoading(WrappedComponent, actionTypes) {
  function HOC({isLoading, ...props}) {
    return (
      <View style={styles.main}>
        <WrappedComponent {...props} />
        {isLoading && (
          <View style={styles.container}>
            <View style={[styles.loadingIndicator, styles.indicatorBg]}>
              <Lottie
                source={require('../assets/images/animation.json')}
                autoPlay
                loop
                style={styles.loadingStyle}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
  const mapStateToProps = state => ({
    isLoading: getLoadingSelector(state, actionTypes),
  });
  return connect(mapStateToProps, null)(HOC);
}
export default withLoading;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingStyle: {
    width: scale(300),
    height: verticalScale(300),
    alignSelf: 'center',
  },
});
