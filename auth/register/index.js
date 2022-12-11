import {View, Text, ScrollView, ToastAndroid, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {styles} from './styles';
import AppIcon from '../../../assets/icons';
import {scale, verticalScale} from '../../../utils/scale';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signUpRequest} from '../../../redux/auth/action';
import {SvgXml} from 'react-native-svg';
import {validateRegisterSchema} from '../../../utils/schema';
import CustomTextInput from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton';
import {showModal} from '../../../components/customNotiModal';
import {
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../../redux/loading/action';
import IMAGES from '../../../assets/images';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const initialValues = {
    email: '',
    password: '',
    fullname: '',
    phone: '',
    confirmPassword: '',
  };
  const onSignUp = useCallback(
    values => {
      dispatch(getChangeLoadingRequest());
      dispatch(
        signUpRequest(
          {
            email: values.email,
            password: values.password,
            fullname: values.fullname,
            phone: values.phone,
          },
          () => {
            ToastAndroid.show('Đăng kí thành công', ToastAndroid.SHORT);
            return navigation.navigate('Login');
          },
        ),
      );
    },
    [dispatch],
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.viewLogo}>
          <Image source={IMAGES.Logo} resizeMode="contain" style={styles.img} />
          <Text style={styles.textLogo}>HighTech</Text>
        </View>
        <Text style={styles.textWelcome}>Let's Get Started</Text>
        <Text style={styles.text}>Tạo tài khoản mới</Text>
        <Formik
          initialValues={initialValues}
          validateOnChange={true}
          onSubmit={onSignUp}
          validationSchema={validateRegisterSchema}>
          {({errors, values, setFieldValue, handleSubmit}) => {
            return (
              <>
                <CustomTextInput
                  value={values.fullname}
                  leftIcon={AppIcon.IconAccountGrey}
                  textPlaceHolder={'Họ tên'}
                  containerTextInputStyle={{marginTop: verticalScale(12)}}
                  textErrors={errors.fullname}
                  onChangeText={text => setFieldValue('fullname', text)}
                />
                <CustomTextInput
                  value={values.phone}
                  leftIcon={AppIcon.IconPhoneGrey}
                  textPlaceHolder={'Số điện thoại'}
                  containerTextInputStyle={{marginTop: verticalScale(12)}}
                  textErrors={errors.phone}
                  keyboardType="phone-pad"
                  onChangeText={text => setFieldValue('phone', text)}
                />
                <CustomTextInput
                  value={values.email}
                  leftIcon={AppIcon.IconMailGrey}
                  textPlaceHolder={'Email'}
                  containerTextInputStyle={{marginTop: verticalScale(12)}}
                  textErrors={errors.email}
                  onChangeText={text => setFieldValue('email', text)}
                />
                <CustomTextInput
                  value={values.password}
                  leftIcon={AppIcon.IconLockGrey}
                  textPlaceHolder={'Mật khẩu'}
                  containerTextInputStyle={{marginTop: verticalScale(12)}}
                  secureTextEntry={hidePass}
                  textErrors={errors.password}
                  onClear={() => setHidePass(!hidePass)}
                  rightIcon={hidePass ? AppIcon.IconCloseEye : AppIcon.IconEye}
                  onChangeText={text => setFieldValue('password', text)}
                />
                <CustomTextInput
                  value={values.confirmPassword}
                  leftIcon={AppIcon.IconLockGrey}
                  textPlaceHolder={'Xác nhận Mật khẩu'}
                  containerTextInputStyle={{marginTop: verticalScale(12)}}
                  secureTextEntry={hidePass}
                  rightIcon={hidePass ? AppIcon.IconCloseEye : AppIcon.IconEye}
                  textErrors={errors.confirmPassword}
                  onChangeText={text => setFieldValue('confirmPassword', text)}
                  onClear={() => setHidePass(!hidePass)}
                />
                <CustomButton
                  title={'Đăng kí'}
                  containerStyles={styles.containerBtn}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
        <Text style={styles.text}>
          Bạn đã có tài khoản?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.textBlue}>
            Đăng Nhập
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Register;
