import {View, Text, TouchableOpacity, Keyboard, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../../assets/icons';
import {scale, verticalScale} from '../../../utils/scale';
import CustomTextInput from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../../redux/auth/action';
import {Formik} from 'formik';
import {validateLoginSchema} from '../../../utils/schema';
import CustomNotiModal, {showModal} from '../../../components/customNotiModal';
import MyLoading from '../../../components/loading';
import {getChangeLoadingRequest} from '../../../redux/loading/action';
import {getChangeLoading} from '../../../redux/loading/selector';
import IMAGES from '../../../assets/images';
const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialValues = {email: '', password: ''};
  const loading = useSelector(getChangeLoading);
  const [isLoading, setIsLoading] = useState(loading);
  const onLogin = useCallback(
    values => {
      Keyboard.dismiss();
      dispatch(loginRequest({email: values.email, password: values.password}));
      dispatch(getChangeLoadingRequest({loading: true}));
    },
    [dispatch],
  );
  const onShowModal = () => {
    showModal({
      title: 'Phương thức đăng nhập chưa được hổ trợ',
      message: 'Vui lòng chọn phương thức khác',
    });
  };
  const [hide, setHide] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.viewLogo}>
          <Image source={IMAGES.Logo} resizeMode="contain" style={styles.img} />
          <Text style={styles.textLogo}>HighTech</Text>
        </View>

        <Text style={styles.textWelcome}>Welcome to High Tech</Text>
        <Text style={styles.text}>Đăng nhập để tiếp tục sử dụng</Text>
        <Formik
          initialValues={initialValues}
          validateOnChange={true}
          onSubmit={onLogin}
          validationSchema={validateLoginSchema}>
          {({errors, values, setFieldValue, handleSubmit}) => {
            return (
              <>
                <CustomTextInput
                  value={values.email}
                  leftIcon={AppIcon.IconMailGrey}
                  textPlaceHolder={'Email'}
                  containerTextInputStyle={{marginTop: verticalScale(28)}}
                  textErrors={errors.email}
                  onChangeText={text => setFieldValue('email', text)}
                />
                <CustomTextInput
                  value={values.password}
                  leftIcon={AppIcon.IconLockGrey}
                  textPlaceHolder={'Mật khẩu'}
                  containerTextInputStyle={{marginTop: verticalScale(18)}}
                  secureTextEntry={hide}
                  textErrors={errors.password}
                  onChangeText={text => setFieldValue('password', text)}
                  rightIcon={hide ? AppIcon.IconCloseEye : AppIcon.IconEye}
                  onClear={() => setHide(!hide)}
                />
                <CustomButton
                  title={'Đăng nhập'}
                  containerStyles={styles.containerBtn}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>

        <View style={styles.containerOr}>
          <View style={styles.viewOr}></View>
          <Text style={styles.textOR}>OR</Text>
          <View style={styles.viewOr}></View>
        </View>
        {/* <CustomButton
          title={'Đăng nhập với Google'}
          containerStyles={styles.containerBtnGG}
          leftIcon={AppIcon.IconGG}
          onPress={onShowModal}
          textStyles={styles.textBtn}
        />
        <CustomButton
          title={'Đăng nhập với Facebook'}
          containerStyles={styles.containerBtnFB}
          leftIcon={AppIcon.IconFB}
          onPress={onShowModal}
          textStyles={styles.textBtn}
        /> */}
        <Text style={styles.text}>
          Bạn chưa có tài khoản?{' '}
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.textBlue}>
            Đăng kí
          </Text>
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.touch}>
          <Text style={styles.textForgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <CustomNotiModal />
      {loading && <MyLoading />}
    </View>
  );
};

export default Login;
