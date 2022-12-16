import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './styles';
import Lottie from 'lottie-react-native';
import Header from '../../../components/header';
import CustomTextInput from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {validateEmailSchema} from '../../../utils/schema';
import {forgotPasswordApi, veryfiCodedApi} from '../../../services/api/auth';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AppTheme} from '../../../config/AppTheme';
import IMAGES from '../../../assets/images';
import {useDispatch} from 'react-redux';
import {
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../../redux/loading/action';
import {showModal} from '../../../components/customNotiModal';

const CELL_COUNT = 4;
const ForgotPassword = () => {
  const initialValues = {email: ''};
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isShow, setIsShow] = useState(true);
  const [user, setUser] = useState('');
  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const [verify, setVerify] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  const onSendEmail = useCallback(values => {
    setEmail(values.email);
    dispatch(getChangeLoadingRequest());
    console.log('aabbbb');
    forgotPasswordApi({email: values.email})
      .then(res => {
        setIsShow(false);
        dispatch(getChangeLoadingSuccess());
        setUser(res.data.user);
        console.log('res -> ', res);
      })
      .catch(e => {
        console.log('message error -> ', e);
        ToastAndroid.show(e.response?.data.message, ToastAndroid.SHORT);
        dispatch(getChangeLoadingSuccess());
      });
  }, []);
  useEffect(() => {
    var timer;
    if (seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
    }
    return () => clearTimeout(timer);
  }, [seconds]);
  const onReSendCode = useCallback(() => {
    dispatch(getChangeLoadingRequest());
    forgotPasswordApi({email: email})
      .then(res => {
        setSeconds(59);
        dispatch(getChangeLoadingSuccess());
        ToastAndroid.show(
          'Gửi code thành công vui lòng kiểm tra email',
          ToastAndroid.SHORT,
        );
      })
      .catch(e => {
        console.log('e ', e);
        dispatch(getChangeLoadingSuccess());
        showModal({
          title: e.response?.data.message,
        });
      });
  }, [user, email]);
  const onSendVerify = () => {
    dispatch(getChangeLoadingRequest());
    veryfiCodedApi({
      user: user,
      verifyCode: value,
    })
      .then(res => {
        dispatch(getChangeLoadingSuccess());
        navigation.replace('ConfirmPassword', {
          user: user,
          verify: value,
        });
      })
      .catch(e => {
        console.log('e ', e);
        dispatch(getChangeLoadingSuccess());

        ToastAndroid.show(e.response?.data.message, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <Header iconBack title={'Quên mật khẩu'} />
      <View style={styles.body}>
        {isShow ? (
          <>
            <Text style={styles.textTitle}>Nhập địa chỉ email đã đăng kí</Text>
            <Formik
              initialValues={initialValues}
              validateOnChange={true}
              onSubmit={onSendEmail}
              validationSchema={validateEmailSchema}>
              {({errors, values, setFieldValue, handleSubmit}) => {
                return (
                  <>
                    <CustomTextInput
                      onChangeText={text => setFieldValue('email', text)}
                      textPlaceHolder={'Email'}
                      textErrors={errors.email}
                    />
                    <Text
                      style={styles.textBack}
                      onPress={() => navigation.navigate('Login')}>
                      Quay về đăng nhập
                    </Text>
                    <CustomButton title={'Gửi'} onPress={handleSubmit} />
                  </>
                );
              }}
            </Formik>
          </>
        ) : (
          <View style={styles.viewCode}>
            <Text style={styles.textTitle}>Code sẽ được gửi tới</Text>
            <Text style={styles.textCode}>{email}</Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <CustomButton title={'Gửi'} onPress={onSendVerify} />
            <View>
              <Text style={styles.text}>Chưa nhận được code ? </Text>
              <Text
                onPress={onReSendCode}
                style={[
                  styles.textCode,
                  {
                    color:
                      seconds > 0 ? AppTheme.Colors.Grey : AppTheme.Colors.Blue,
                  },
                ]}>
                {seconds === 0 ? 'Gửi lại mã' : `Gửi lại sau : ${seconds}`}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.viewOr}>
          <Text style={styles.textLine} />
          <Text style={styles.textOR}>OR</Text>
          <Text style={styles.textLine} />
        </View>

        <Text style={styles.text}>Bạn chưa có tài khoản?</Text>
        <CustomButton
          title={'Đăng kí'}
          onPress={() => navigation.navigate('Register')}
          containerStyles={styles.containerRegister}
          textStyles={styles.textRegister}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
