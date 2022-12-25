import {
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import CustomTextInput from '../../components/customTextInput';
import AppIcon from '../../assets/icons';
import useDebounce from '../../helpers/debounce';
import {scale, verticalScale} from '../../utils/scale';
import Header from '../../components/header';
import CustomButton from '../../components/customButton';
import axios, {Axios} from 'axios';
import {updateProfileApi} from '../../services/api/auth';
import {getUserSelector} from '../../redux/auth/selector';

const API_KEY = 'H5CAX9nvSie1tiNgXBXcxBdHifB62bDDzFGziglw';

const Location = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 16.0799812,
    longitude: 108.2193428,
  });
  const [makerPosition, setMakerPosition] = useState({
    latitude: 16.0799812,
    longitude: 108.2193428,
  });
  const userInfor = useSelector(getUserSelector);
  const [value, setValue] = useState('');
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState('');
  const debouncedValue = useDebounce(place, 300);
  const [disabledButton, setDisabledButton] = useState(true);
  const [selectionTextInput, setSelectionTextInput] = useState({});
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const getPlacess = text => {
    setPlace(text);
    setValue(text);
    setDisabledButton(true);
  };

useEffect(() => {
  Geolocation.getCurrentPosition(()=>{});
}, [])


  useEffect(() => {
    axios
      .get(
        `https://rsapi.goong.io/Place/AutoComplete?api_key=${API_KEY}&input=${debouncedValue}`,
      )
      .then(res => {
        setPlaces(res.data.predictions);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, [debouncedValue, place]);

  const findPlace = useCallback(
    id => {
      axios
        .get(
          `https://rsapi.goong.io/Place/Detail?place_id=${id}&api_key=${API_KEY}`,
        )
        .then(res => {
          setRegion({
            latitude: res.data.result.geometry.location.lat,
            longitude: res.data.result.geometry.location.lng,
          });
          setMakerPosition({
            latitude: res.data.result.geometry.location.lat,
            longitude: res.data.result.geometry.location.lng,
          });

          setPlaces([]);
          Keyboard.dismiss();
        })
        .catch(e => {
          console.log('Error', e);
        });
    },
    [places],
  );

  const onAddAddressToProfile = () => {};

  const onBackCurrentPosition = () => {
    Geolocation.getCurrentPosition(pos => {
      setRegion({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      axios
        .get(
          `https://rsapi.goong.io/Geocode?latlng=${pos.coords.latitude},${pos.coords.longitude}&api_key=${API_KEY}`,
        )
        .then(res => {
          setValue(res.data.results[0].formatted_address);
          setMakerPosition({
            latitude: res.data.results[0].geometry.location.lat,
            longitude: res.data.results[0].geometry.location.lng,
          });
        })
        .catch(e => {
          console.log('Error', e);
        });
    });
    setDisabledButton(false);
  };

  const onChooseAddress = useCallback(() => {
    navigation.navigate('SettingAddress', {address: value, position: makerPosition});
  }, [value, place]);
  return (
    <View style={styles.container}>
      <Header title="Chọn vị trí" iconBack={true} />
      <View style={styles.body}>
        <View style={styles.viewTextInput}>
          <CustomTextInput
            textInputStyle={styles.inputStyle}
            containerTextInputStyle={styles.textInputContainer}
            textPlaceHolder={'Nhập địa chỉ'}
            value={value}
            rightIcon={AppIcon.IconSearch}
            onChangeText={text => {
              setPlace(text);
              setValue(text);
              setDisabledButton(true);
            }}
          />
        </View>
        {places && (
          <View style={styles.listPlaces}>
            {places?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemPlaces}
                onPress={() => {
                  setValue(item.description);
                  findPlace(item.place_id);
                  setDisabledButton(false);
                }}>
                <SvgXml
                  xml={AppIcon.IconAddress}
                  width={scale(20)}
                  height={scale(20)}
                />
                <Text key={index} style={styles.textPlaces}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View>
        <MapView
          style={styles.mapViewContainer}
          region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: makerPosition.latitude,
              longitude: makerPosition.longitude,
            }}>
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
        </MapView>
      </View>

      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={styles.viewCurrentPosition}
          onPress={onBackCurrentPosition}>
          <SvgXml
            xml={AppIcon.IconFocus}
            width={scale(30)}
            height={scale(30)}
          />
        </TouchableOpacity>
        <CustomButton
          title="Chọn"
          disabled={disabledButton}
          containerStyles={[
            styles.buttonContainerStyle,
            {opacity: disabledButton ? 0.5 : 1},
          ]}
          textStyles={styles.textBtnStyle}
          onPress={onChooseAddress}
        />
      </View>
    </View>
  );
};

export default Location;
