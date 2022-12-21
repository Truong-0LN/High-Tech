import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  NativeModules,
  NativeEventEmitter,
  KeyboardAvoidingView,
  Button,
  LogBox,
  AppState,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import Header from '../../components/header';
import ProducOnCart from '../../components/customProductOnCart';
import CustomButton from '../../components/customButton';
import {scale, verticalScale} from '../../utils/scale';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCartRequest} from '../../redux/cart/action';
import {
  getListCartSelector,
  getStatusCartSelector,
} from '../../redux/cart/selector';
import Lottie from 'lottie-react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {formatMoney} from '../../helpers/formatMoney';
import {updateQuantityProductApi} from '../../services/api/cart';
import {createOrderApi, getCheckCoupon} from '../../services/api/order';
import IMAGES from '../../assets/images';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../assets/icons';
import {getChangeLoading} from '../../redux/loading/selector';
import MyLoading from '../../components/loading';
import {
  getChangeLoadingFailed,
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../redux/loading/action';
import {showModal} from '../../components/customNotiModal';
import ItemAddress from '../account/components/ItemAddress';
import {getUserSelector} from '../../redux/auth/selector';
import ReactNativeModal from 'react-native-modal';
import PlaceholderCart from '../../components/placholderCart';
import {AppTheme} from '../../config/AppTheme';
import CryptoJS from 'crypto-js';
import {getShippingAddress} from '../../redux/location/selector';

const {PayZaloBridge} = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs(['EventEmitter.removeListener']);
const Cart = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const itemChooseAddress = props.route.params?.itemChooseAddress;
  const shippingAddress = useSelector(getShippingAddress);
  const listCart = useSelector(getListCartSelector);
  const userInfor = useSelector(getUserSelector);
  const [totalItem, setTotalItem] = useState(0);
  const [initialPrice, setInitialPrice] = useState(0);
  const [feeShip, setFeeShip] = useState(30000);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [modalPaymentMethod, setModalPaymentMethod] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myAddress, setMyAddress] = useState({
    address: '',
    name: '',
    phone: '',
    latlng: [],
  });
  const [coupon, setCoupon] = useState('');
  const [couponMoney, setCouponMoney] = useState(0);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    if (shippingAddress.address !== '') {
      setMyAddress(shippingAddress);
    }
  }, [shippingAddress]);
  const createOrder = () => {
    let data;
    let arrItem = [];
    console.log('list casdrt ', listCart);
    for (let index = 0; index < listCart.length; index++) {
      let item = {
        product: listCart[index].product._id,
        quantity: listCart[index].quantity,
      };
      console.log('item, ', item);
      arrItem.push(item);
    }
    let couponActive = '';
    if (couponMoney > 0) {
      couponActive = coupon;
    }
    data = {
      items: arrItem,
      paymentMethod: paymentMethod,
      shippingAddress: myAddress,
      phone: myAddress.phone,
      totalPrice: finalPrice,
      isPaid: paymentMethod === 'ZALOPAY' ? true : false,
      coupon: couponActive,
    };
    createOrderApi(data)
      .then(res => {
        showModal({
          title: 'Yeah!!!',
          message: 'Đặt hàng thành công!',
        });
        dispatch(getChangeLoadingSuccess());
        dispatch(getAllCartRequest());
        setCoupon('');
        setCouponMoney(0);
      })
      .catch(e => {
        console.log('errors ', e);
        dispatch(getChangeLoadingSuccess());
        showModal({
          title: e.response.data.message,
        });
      });
  };
  const ref = useRef();
  useEffect(() => {
    ref.current = payZaloBridgeEmitter.addListener(
      'EventPayZalo',
      data => {
        if (data.returnCode == 1) {
          createOrder();
        } else {
          showModal({
            title: 'Có lỗi xảy ra vui lòng thử lại sau',
          });
        }
      },
    );
    return () => ref.current.remove()
  }, [ref.current, isFocused, listCart, couponMoney,myAddress]);

  useEffect(() => {
    isFocused && dispatch(getChangeLoadingRequest());
    isFocused && dispatch(getAllCartRequest());
    isFocused && setTimeout(() => setIsLoading(false), 2000);
  }, [isFocused]);
  useEffect(() => {
    let _totalItem = 0;
    let _initialPrice = 0;
    let _discount = 0;
    let _finalPrice = 0;

    for (let index = 0; index < listCart.length; index++) {
      _totalItem += listCart[index].quantity;
      _initialPrice +=
        listCart[index].product.salePrice * listCart[index].quantity;
      // _discount +=
      //   listCart[index].product.costPrice * listCart[index].quantity -
      //   listCart[index].product.salePrice * listCart[index].quantity;
      _finalPrice +=
        listCart[index].product.salePrice * listCart[index].quantity;
    }
    // setDiscount(_discount);
    setFinalPrice(_finalPrice + feeShip - couponMoney);
    setTotalItem(_totalItem);
    setInitialPrice(_initialPrice);
  }, [navigation, listCart,couponMoney]);
  const onUpdateQuantity = useCallback((_id, quantity) => {
    dispatch(getChangeLoadingRequest());
    updateQuantityProductApi({productId: _id, quantity: quantity})
      .then(res => {
        isFocused && dispatch(getAllCartRequest());
        dispatch(getChangeLoadingSuccess());
      })
      .catch(e => {
        dispatch(getChangeLoadingSuccess());
        showModal({
          title: e.response.data.message,
        });
      });
  }, []);

  const onCreateOrder = () => {
    dispatch(getChangeLoadingRequest());
    if (paymentMethod === 'ZALOPAY') {
      callPaymentZaloPay();
    } else {
      createOrder();
    }
  };
  const onChoosePaymentMethod = title => {
    setPaymentMethod(title);
    setModalPaymentMethod(false);
  };
  const onChooseAddress = () => {
    navigation.navigate('MyAddress', {isDelete: false});
  };
  const onGotoProductDetail = _id => {
    navigation.navigate('ProductDetail', {productId: _id});
  };
  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }
  const renderStringItem = () => {
    let arrItem = [];
    for (let index = 0; index < listCart.length; index++) {
      let item = {
        product: listCart[index].product._id,
        quantity: listCart[index].quantity,
      };
      arrItem.push(item);
    }
    return JSON.stringify(arrItem);
  };
  async function callPaymentZaloPay() {
    dispatch(getChangeLoadingRequest());
    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
    let appid = 2553;
    let amount = parseInt(finalPrice);
    let appuser = userInfor.email;
    let apptime = new Date().getTime();
    let embeddata = '{}';
    let item = renderStringItem();
    let description = 'Thanh toán High Tech ' + apptransid;
    let title = 'Thanh toán High Tech';
    let hmacInput =
      appid +
      '|' +
      apptransid +
      '|' +
      appuser +
      '|' +
      amount +
      '|' +
      apptime +
      '|' +
      embeddata +
      '|' +
      item;
    let mac = CryptoJS.HmacSHA256(
      hmacInput,
      'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    );
    console.log('====================================');
    console.log('hmacInput: ' + hmacInput);
    console.log('mac: ' + mac);
    console.log('====================================');
    var order = {
      app_id: appid,
      app_user: appuser,
      app_time: apptime,
      amount: finalPrice,
      app_trans_id: apptransid,
      embed_data: embeddata,
      item: item,
      description: description,
      mac: mac,
    };
    let formBody = [];
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(resJson => {
        payOrder(resJson.zp_trans_token);
        if (resJson.return_message != 'Giao dịch thành công') {
          showModal({
            title: resJson.sub_return_message,
          });
        }
      })
      .catch(error => {
        dispatch(getChangeLoadingSuccess());
        showModal({
          title: 'Lỗi chưa xác định',
          message: 'Vui lòng thử lại sau!!!',
        });
        console.log('error ', error);
      });
  }

  function payOrder(_token) {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(_token);
  }
  const onCheckCoupon = () => {
    dispatch(getChangeLoadingRequest());
    getCheckCoupon({code: coupon})
      .then(res => {
        dispatch(getChangeLoadingSuccess());
        res?.message === 'success' && setCouponMoney(res?.data?.value);
      })
      .catch(error => {
        dispatch(getChangeLoadingFailed());
        showModal({
          title: error?.response.data?.message,
        });
        setCoupon('');
        setCouponMoney(0);
      });
  };
  return (
    <View style={styles.container}>
      <Header title={'Giỏ hàng'} />
      {!isLoading ? (
        <>
          {listCart.length > 0 ? (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: verticalScale(20),
              }}
              showsVerticalScrollIndicator={false}
              style={styles.body}>
              <View style={styles.viewList}>
                {listCart &&
                  listCart.map((item, index) => {
                    return (
                      <ProducOnCart
                        onPress={() => onGotoProductDetail(item?.product?._id)}
                        key={index}
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                      />
                    );
                  })}
              </View>
              <View style={styles.footer}>
                {myAddress?.address === '' ? (
                  <View style={styles.viewAddress}>
                    <TouchableOpacity onPress={onChooseAddress}>
                      <Text style={styles.textChooseAddress}>Chọn địa chỉ</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ItemAddress
                    address={myAddress?.address}
                    name={myAddress?.name}
                    phone={myAddress?.phone}
                    onPress={onChooseAddress}
                  />
                )}
                <TouchableOpacity
                  onPress={() => setModalPaymentMethod(true)}
                  style={styles.touchPaymentMethod}>
                  <Text style={styles.textMethod}>Phương thức thanh toán </Text>
                  <Text style={styles.textPaymentMethod}>
                    {paymentMethod === 'COD' ? 'Tiền mặt' : 'ZaloPay'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.viewCode}>
                  <TextInput
                    placeholder="Nhập mã code"
                    style={styles.textInput}
                    autoCapitalize="characters"
                    keyboardType="default"
                    value={coupon}
                    onChangeText={text => setCoupon(text.toLocaleUpperCase())}
                  />
                  <TouchableOpacity
                    onPress={onCheckCoupon}
                    style={styles.touch}>
                    <Text style={styles.textTouch}>OK</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewTotalPrice}>
                  <View style={styles.viewFdl}>
                    <Text style={styles.text}>Tạm tính ({totalItem})</Text>
                    <Text style={styles.text}>{formatMoney(initialPrice)}</Text>
                  </View>
                  <View style={styles.viewFdl}>
                    <Text style={styles.text}>Phí vận chuyển</Text>
                    <Text style={styles.text}>{formatMoney(feeShip)}</Text>
                  </View>
                  {/* <View style={styles.viewFdl}>
                    <Text style={styles.text}>Giảm giá</Text>
                    <Text style={styles.text}>- {formatMoney(discount)}</Text>
                  </View> */}
                  {couponMoney !== 0 && (
                    <View style={styles.viewFdl}>
                      <Text style={styles.text}>Mã Giảm giá</Text>
                      <Text style={styles.text}> {coupon}</Text>
                    </View>
                  )}
                  {couponMoney !== 0 && (
                    <View style={styles.viewFdl}>
                      <Text style={styles.text}>Tiền giảm từ coupon</Text>
                      <Text style={styles.text}>
                        {' '}
                        - {formatMoney(couponMoney)}
                      </Text>
                    </View>
                  )}

                  <View style={styles.viewFdl}>
                    <Text style={styles.textTotal}>Tổng cộng</Text>
                    <Text style={styles.textPriceTotal}>
                      {formatMoney(finalPrice)}
                    </Text>
                  </View>
                </View>
                {myAddress?.address !== '' ? (
                  <CustomButton title={'Mua'} onPress={onCreateOrder} />
                ) : (
                  <CustomButton
                    title="Mua"
                    disabled
                    containerStyles={styles.containerStyle}
                  />
                )}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.container}>
              <View style={styles.noProduct}>
                <SvgXml
                  xml={AppIcon.IconNotFound}
                  width={scale(144)}
                  height={scale(144)}
                />
                <Text style={styles.textNoProduct}>Giỏ hàng trống</Text>
                <CustomButton
                  title={'Đi mua sắm nào!'}
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            </View>
          )}
        </>
      ) : (
        <PlaceholderCart />
      )}

      <ReactNativeModal
        isVisible={modalPaymentMethod}
        animationIn={'slideInUp'}
        style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => setModalPaymentMethod(false)}
          style={styles.touchModal}
        />
        <View style={styles.centerView}>
          <View style={styles.modalHeader}>
            <Text style={styles.textHeader}>Chọn phương thức thanh toán</Text>
          </View>
          <TouchableOpacity
            onPress={() => onChoosePaymentMethod('COD')}
            style={[
              styles.touchPayment,
              {
                backgroundColor:
                  paymentMethod === 'COD'
                    ? AppTheme.Colors.Yellow
                    : AppTheme.Colors.White,
              },
            ]}>
            <SvgXml
              xml={AppIcon.IconCash}
              height={scale(24)}
              width={scale(24)}
            />
            <Text style={styles.textChooseMethod}>Tiền mặt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChoosePaymentMethod('ZALOPAY')}
            style={[
              styles.touchPayment,
              {
                backgroundColor:
                  paymentMethod === 'ZALOPAY'
                    ? AppTheme.Colors.Yellow
                    : AppTheme.Colors.White,
              },
            ]}>
            <SvgXml
              xml={AppIcon.IconZaloPay}
              height={scale(26)}
              width={scale(26)}
            />
            <Text style={styles.textChooseMethod}>ZaloPay</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Cart;
