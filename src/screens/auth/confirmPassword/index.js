import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Header from '../../../components/header';
import CustomTextInput from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton';
import {Formik} from 'formik';
import {validateConfirmPasswordSchema} from '../../../utils/schema';
import {resetPassworddApi} from '../../../services/api/auth';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import IMAGES from '../../../assets/images';

const ConfirmPassword = props => {
  const {user, verify} = props.route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const onSendPassword = values => {
    setIsLoading(true);
    resetPassworddApi({
      user: user,
      newPassword: values.password,
      verifyCode: verify,
    })
      .then(res => {
        setIsLoading(false);
        ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
        navigation.replace('Login');
      })
      .catch(e => {
        setIsLoading(false);
        ToastAndroid.show(
          'Đã có lỗi gì đó xảy ra! Vui lòng thử lại sau',
          ToastAndroid.SHORT,
        );
      });
  };
  const initialValue = {password: '', confirmPassword: ''};
  return (
    <View style={styles.container}>
      <Header iconBack title={'Xác nhận mật khẩu'} />
      <View style={styles.body}>
        <Text style={styles.textTitle}>
          Xác nhận mật khẩu để sử dụng cho lần đăng nhập tiếp theo
        </Text>
        <Formik
          initialValues={initialValue}
          onSubmit={onSendPassword}
          validationSchema={validateConfirmPasswordSchema}
          validateOnChange={true}>
          {({errors, setFieldValue, values, handleSubmit}) => {
            return (
              <>
                <CustomTextInput
                  secureTextEntry
                  value={values}
                  textPlaceHolder={'Nhập mật khẩu mới'}
                  containerTextInputStyle={styles.textInputStyle}
                  onChangeText={text => setFieldValue('password', text)}
                  textErrors={errors.password}
                />
                <CustomTextInput
                  secureTextEntry
                  value={values}
                  textPlaceHolder={'Xác nhận mật khẩu'}
                  containerTextInputStyle={styles.textInputStyle}
                  onChangeText={text => setFieldValue('confirmPassword', text)}
                  textErrors={errors.confirmPassword}
                />
                <CustomButton
                  onPress={handleSubmit}
                  title="OK"
                  containerStyles={styles.buttonStyle}
                />
              </>
            );
          }}
        </Formik>
      </View>
      {isLoading && (
        <View style={styles.containerLoading}>
          <View style={styles.loadingIndicator}>
            <Lottie
              source={IMAGES.ANIMATION}
              autoPlay
              loop
              style={styles.loadingStyle}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ConfirmPassword;
