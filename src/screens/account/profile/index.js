import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../../components/header';
import {AppTheme} from '../../../config/AppTheme';
import {scale, verticalScale} from '../../../utils/scale';
import IMAGES from '../../../assets/images';
import ItemProfile from './components/ItemProfile';
import AppIcon from '../../../assets/icons';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfoRequest, logoutRequest} from '../../../redux/auth/action';
import {useNavigation} from '@react-navigation/native';
import {getUserSelector} from '../../../redux/auth/selector';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {defaultImg} from '..';
import CustomTextInput from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton';
import {updateProfileApi} from '../../../services/api/auth';
import MyLoading from '../../../components/loading';
import {Formik} from 'formik';
import {validateUpdateSchema} from '../../../utils/schema';
import {
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../../redux/loading/action';
import {showModal} from '../../../components/customNotiModal';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(getUserSelector);
  const [avatar, setAvatar] = useState(userInfo?.avatar);
  const [formAvatar, setformAvatar] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const initialValue = {
    fullname: userInfo.fullname,
    email: userInfo.email,
    phone: userInfo.phone,
  };

  const onUpdate = async _value => {
    if (formAvatar) {
      dispatch(getChangeLoadingRequest());
      const formData = formAvatar;
      formData.append('fullname', _value.fullname);
      formData.append('email', _value.email);
      formData.append('phone', _value.phone);
      const token = await AsyncStorage.getItem('token');
      axios({
        method: 'put',
        url: 'http://quyt.ddns.net:3000/access/me',
        data: formData,
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          dispatch(getUserInfoRequest());
          dispatch(getChangeLoadingSuccess());
          showModal({
            title: 'Cập nhật thành công',
            onConfirmPress: () => navigation.goBack(),
          });
        })
        .catch(error => {
          dispatch(getChangeLoadingSuccess());
        });
    } else {
      dispatch(getChangeLoadingRequest());
      updateProfileApi({fullname: _value.fullname, phone: '0329584651'})
        .then(res => {
          showModal({
            title: 'Cập nhật thành công',
            onConfirmPress: () => navigation.goBack(),
          });
          dispatch(getChangeLoadingSuccess());
        })
        .catch(err => {
          dispatch(getChangeLoadingSuccess());
        });
    }
  };
  const onChooseAvatar = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const avata = await launchImageLibrary(options, res => {
      if (!res?.didCancel) {
        setAvatar(res?.assets[0]?.uri);
        setIsUpdate(true);
      }
    })
    const formData = new FormData();
    if (avata) {
      avata?.assets &&
        formData.append(
          'avatar',
          JSON.parse(
            JSON.stringify({
              uri: avata.assets[0]?.uri,
              type: avata.assets[0]?.type,
              name: avata.assets[0].fileName,
            }),
          ),
        );
      setformAvatar(formData);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Header title={'Tài khoản'} iconBack />
      <View style={styles.body}>
        <ImageBackground
          source={IMAGES.BACKGROUND}
          style={{width: '100%', height: verticalScale(150)}}
        />
        <View style={{top: verticalScale(-100)}}>
          <View style={styles.viewAvatar}>
            <Image source={{uri: avatar}} style={styles.img} />
            <TouchableOpacity style={styles.touchChange}>
              <Text onPress={onChooseAvatar} style={styles.textChange}>
                Đổi avatar
              </Text>
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={initialValue}
            onSubmit={onUpdate}
            validateOnChange={true}
            validationSchema={validateUpdateSchema}>
            {({errors, setFieldValue, handleSubmit, values}) => {
              useEffect(() => {
                if (
                  values.phone !== initialValue.phone ||
                  values.fullname !== initialValue.fullname
                ) {
                  setIsUpdate(true);
                } else {
                  false;
                }
              }, [values]);

              return (
                <>
                  <View style={styles.viewInfo}>
                    <View style={styles.viewItem}>
                      <Text style={styles.textName}>Họ và tên</Text>
                      <CustomTextInput
                        value={values.fullname}
                        containerTextInputStyle={styles.containerTextInputStyle}
                        onChangeText={text => setFieldValue('fullname', text)}
                        textErrors={errors.fullname}
                        textPlaceHolder={'Nhập họ và tên'}
                      />
                    </View>
                  </View>
                  <View style={styles.viewInfo}>
                    <View style={styles.viewItem}>
                      <Text style={styles.textName}>Email</Text>
                      <CustomTextInput
                        value={values.email}
                        containerTextInputStyle={styles.containerTextInputStyle}
                        onChangeText={text => setFieldValue('email', text)}
                        textErrors={errors.email}
                        editable={false}
                      />
                    </View>
                  </View>
                  <View style={styles.viewInfo}>
                    <View style={styles.viewItem}>
                      <Text style={styles.textName}>Số điện thoại</Text>
                      <CustomTextInput
                        value={values.phone}
                        containerTextInputStyle={styles.containerTextInputStyle}
                        onChangeText={text => setFieldValue('phone', text)}
                        textErrors={errors.phone}
                        textPlaceHolder={'Nhập số điện thoại'}
                        keyboardType='phone-pad'
                      />
                    </View>
                  </View>
                  {
                    <CustomButton
                      title={'Cập nhật'}
                      containerStyles={
                        isUpdate
                          ? styles.containerButtonStyle
                          : styles.containerButtonDisableStyle
                      }
                      onPress={handleSubmit}
                    />
                  }
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerButtonStyle: {
    width: scale(320),
    backgroundColor: AppTheme.Colors.Dark,
    borderRadius: scale(20),
    height: verticalScale(45),
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  containerButtonDisableStyle: {
    width: scale(320),
    backgroundColor: AppTheme.Colors.SecondBackround,
    borderRadius: scale(20),
    height: verticalScale(45),
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  viewItem: {
    marginTop: verticalScale(10),
  },
  containerTextInputStyle: {
    borderRadius: scale(10),
    borderColor: '#caf',
  },
  viewInfo: {
    // marginTop: verticalScale(20),
    paddingHorizontal: scale(16),
  },
  touchChange: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  textChange: {
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Blue,
    fontSize: AppTheme.FontSize.SmallX,
    fontWeight: '700',
  },

  textName: {
    fontFamily: AppTheme.Fonts.Bold,
    fontWeight: '700',
    color: AppTheme.Colors.Dark,
    fontSize: AppTheme.FontSize.Large,
    marginLeft: scale(6),
    marginBottom: verticalScale(10),
  },
  viewAvatar: {
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: scale(150),
    height: scale(150),
    borderRadius: 80,
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
});
