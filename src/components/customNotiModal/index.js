import {
  View,
  Text,
  DeviceEventEmitter,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import CustomButton from '../customButton';

const OPEN_MODAL = 'OPEN_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const defaultOptions = {
  title: 'Thông báo',
  message: '',
  hasCancel: false,
  hasConfirm: true,
  hasClose: false,
  hasActions: false,
  textCancel: 'Huỷ bỏ',
  textConfirm: 'Xác nhận',
  cancelTextStyle: {
    color: '#000',
  },

  onCancelPress: () => {},
  onConfirmPress: () => {},
};
const CustomNotiModal = ({}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState(defaultOptions);

  const onCancelPress = useCallback(() => {
    options.onCancelPress();
    setIsVisible(false);
  }, [options]);

  const onConfirmPress = useCallback(() => {
    options.onConfirmPress();
    setIsVisible(false);
  }, [options]);
  useEffect(() => {
    const open_modal = DeviceEventEmitter.addListener(
      OPEN_MODAL,
      newOptions => {
        setIsVisible(true);
        setOptions({...defaultOptions, ...newOptions});
      },
    );
    const hide_modal = DeviceEventEmitter.addListener(HIDE_MODAL, () =>
      setIsVisible(false),
    );

    return () => {
      open_modal.remove();
      hide_modal.remove();
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onCancelPress}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.titleView}>
            <Text style={styles.modalTitle}>{options.title}</Text>
          </View>
          {!!options.message && (
            <Text style={styles.modalText}>{options.message}</Text>
          )}
          <View
            style={[
              styles.buttonArea,
              options.hasCancel && options.hasConfirm && styles.viewCenter,
            ]}>
            {options.hasCancel && (
              <CustomButton
                title={options.textCancel}
                onPress={onCancelPress}
                containerStyle={[styles.button, styles.buttonCancel]}
                textStyle={[styles.textStyle, options.cancelTextStyle]}
              />
            )}
            {options.hasConfirm && (
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={onConfirmPress}>
                <Text style={[styles.textStyle, options.cancelTextStyle]}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(CustomNotiModal);

export const showModal = options => {
  DeviceEventEmitter.emit(OPEN_MODAL, options);
};

export const hideModal = () => {
  DeviceEventEmitter.emit(HIDE_MODAL);
};
