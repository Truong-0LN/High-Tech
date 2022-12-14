import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserSelector} from '../../../redux/auth/selector';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AppTheme} from '../../../config/AppTheme';
import Header from '../../../components/header';
import CustomTextInput from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton';
import {scale, verticalScale} from '../../../utils/scale';
import {Formik} from 'formik';
import {validateAddressSchema} from '../../../utils/schema';
import {updateProfileApi} from '../../../services/api/auth';
import {showModal} from '../../../components/customNotiModal';
import MyLoading from '../../../components/loading';

const SettingAddress = props => {
  const {address, index, name, phone, edit,itemAddress, position} = props?.route?.params; 
  const userInfor = useSelector(getUserSelector);
  const navigation = useNavigation();
  const [addressInput, setAddressInput] = useState(address);
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inititalValue = {fullname: '', phone: ''};
  const {information} = userInfor;
  const isFocused = useIsFocused();
  useEffect(() => {
    if(information.length === 0){
      setIsDefault(true);
    }
  }, [isFocused])
  const onSaveAddress = values => {
    setIsLoading(true);
    if (isDefault) {
      information.map((item, index) => {
        if (item.isDefault === true) {
          item.isDefault = false;
          return;
        }
      });
    }
    information.push({
      address: addressInput,
      isDefault: isDefault,
      name: values.fullname,
      phone: values.phone,
      latlng: [position.latitude, position.longitude]
    });

    updateProfileApi({
      information: information,
    })
      .then(res => {
        setIsLoading(false);
        showModal({
          title: 'Th??m ?????a ch??? m???i th??nh c??ng',
          onConfirmPress: () => navigation.navigate('MyAddress'),
        });
      })
      .catch(error => {
        setIsLoading(false);
        showModal({
          title: '???? c?? l???i x???y ra!',
          message: 'Xin vui l??ng th??? l???i sau gi??y l??t',
          onConfirmPress: () => navigation.navigate('MyAddress'),
        });
      });
  };
  return (
    <View style={styles.container}>
      <Header title={'Th??ng tin ?????a ch???'} iconBack />
      <View style={styles.body}>
        <Formik
          initialValues={inititalValue}
          validateOnChange={true}
          enableReinitialize
          validationSchema={validateAddressSchema}
          onSubmit={onSaveAddress}>
          {({errors, setFieldValue, values, handleSubmit}) => {
            return (
              <>
                <View style={styles.info}>
                  <Text style={styles.textTitle}>Th??ng tin li??n h???</Text>
                  <CustomTextInput
                    textPlaceHolder={'H??? T??n'}
                    containerTextInputStyle={styles.containerTextInputStyle}
                    textInputStyle={styles.textInputStyle}
                    onChangeText={text => setFieldValue('fullname', text)}
                    value={values.fullname}
                    textErrors={errors.fullname}
                  />
                  <CustomTextInput
                    textPlaceHolder={'S??? ??i???n tho???i'}
                    containerTextInputStyle={styles.containerTextInputStyle}
                    textInputStyle={styles.textInputStyle}
                    onChangeText={text => setFieldValue('phone', text)}
                    value={values.phone}
                    textErrors={errors.phone}
                    keyboardType='phone-pad'
                  />
                </View>
                <Text style={styles.textTitle}>?????a ch??? nh???n h??ng</Text>
                <CustomTextInput
                  textPlaceHolder={'?????a ch???'}
                  containerTextInputStyle={styles.containerTextInputStyle}
                  textInputStyle={styles.textInputStyle}
                  onChangeText={text => setAddressInput(text)}
                  value={addressInput}
                  multiline
                  editable={false}
                />
                <View style={styles.viewDefault}>
                  <Text style={styles.textTitle}>?????t l??m ?????a ch??? m???c ?????nh</Text>
                  <Switch
                    trackColor={{
                      false: AppTheme.Colors.Gray,
                      true: AppTheme.Colors.Dark,
                    }}
                    thumbColor={
                      isDefault ? AppTheme.Colors.White : AppTheme.Colors.Light
                    }
                    onValueChange={() => setIsDefault(!isDefault)}
                    value={isDefault}
                  />
                </View>
                <View style={styles.footer}>
                  <CustomButton
                    title={'L??u ?????a ch???'}
                    onPress={handleSubmit}
                    containerStyles={styles.containerStyles}
                    textStyles={styles.textStyles}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
      {isLoading && <MyLoading />}
    </View>
  );
};

export default SettingAddress;

const styles = StyleSheet.create({
  textStyles: {
    color: AppTheme.Colors.White,
  },
  containerStyles: {
    backgroundColor: AppTheme.Colors.Dark,
  },
  viewDefault: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Medium,
    color: AppTheme.Colors.Dark,
    lineHeight: 20,
    letterSpacing: 0.4,
    fontWeight: '700',
  },
  info: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  viewNameAddress: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    marginLeft: scale(8),
  },
  containerTextInputStyle: {
    borderWidth: 1,
    borderRadius: scale(25),
    marginTop: verticalScale(15),
  },
  textName: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.Medium,
    color: AppTheme.Colors.Dark,
    lineHeight: 20,
    letterSpacing: 0.4,
  },
  footer: {
    marginTop: verticalScale(70),
    paddingHorizontal: scale(16),
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
    paddingHorizontal: scale(16),
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
});
