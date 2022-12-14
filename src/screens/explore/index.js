import {
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Header from '../../components/header';
import CustomTextInput from '../../components/customTextInput';
import AppIcon from '../../assets/icons';
import {styles} from './styles';
import CustomButton from '../../components/customButton';
import ItemChooseGear from './components/ItemChooseGear';
import {scale, verticalScale} from '../../utils/scale';
import {DATA_PRODUCTS_CHOOSE} from '../../services/fakeApi/fakeAPI';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import {
  getListCategoriesSelector,
  getListGearToCategoriesSelector,
} from '../../redux/categories/selector';
import {
  getListCategoriesRequest,
  getListGearRequest,
} from '../../redux/categories/action';
import {
  getProductByTypeSelector,
  getProductsSelector,
} from '../../redux/products/selector';
import {formatMoney} from '../../helpers/formatMoney';
import {getAllProductsByTypeRequest} from '../../redux/products/action';
import {getAllProductsByTypeApi} from '../../services/api/products';
import IMAGES from '../../assets/images';
import {addProductsToCartApi} from '../../services/api/cart';
import {getChooseGearRequest} from '../../redux/gear/action';
import {useIsFocused} from '@react-navigation/native';
import {getListGearSelector} from '../../redux/gear/selector';
import {AppTheme} from '../../config/AppTheme';
import {showModal} from '../../components/customNotiModal';
import {
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../redux/loading/action';

const Explore = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listIndex, setListIndex] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [money, setMoney] = useState(0);
  const dispatch = useDispatch();
  const listCategories = useSelector(getListCategoriesSelector);
  const [listGear, setListGear] = useState(listCategories);
  const myListGear = useSelector(getListGearSelector);
  const [valid, setValid] = useState(true);
  useEffect(() => {
    dispatch(getListCategoriesRequest());
    myListGear.length > 0 && fillProductFromRedux();
    setMoney(totalMoney());
  }, []);

  const OpenModalChooseGear = useCallback(
    index => {
      let type;
      if (listCategories[index].type) {
        type = listCategories[index].type;
      } else {
        type = listGear[index].category.type;
      }
      dispatch(getChangeLoadingRequest());
      getAllProductsByTypeApi(type)
        .then(res => {
          setListProduct(res.data);
          setValid(true);
        })
        .catch(e => console.log('errors ', e));
      setModalVisible(true);
    },
    [modalVisible, listIndex, listProduct, listGear],
  );
  const fillProductFromRedux = () => {
    let arr = listCategories;
    arr.map((item, index) => {
      let type = item.type;
      myListGear.map(i => {
        if (i.category.type === type) {
          arr[index] = i;
        }
      });
    });
    setListGear(arr);
    dispatch(getChangeLoadingSuccess());
  };
  const ChooseGear = useCallback(
    item => {
      let arrGear = [];
      setModalVisible(false);
      let newList = listGear;
      newList[listIndex] = item;
      setMoney(totalMoney());
      listGear.map(item => {
        if (!item.icon) {
          arrGear.push(item);
        }
      });
      dispatch(getChooseGearRequest(arrGear));
      dispatch(getChangeLoadingSuccess());
    },
    [modalVisible, listGear],
  );
  const totalMoney = () => {
    let total = 0;
    for (let index = 0; index < listGear.length; index++) {
      if (listGear[index]?.costPrice) {
        if (listGear[index]?.salePrice) {
          total += listGear[index]?.salePrice;
        } else {
          total += listGear[index]?.costPrice;
        }
      }
    }
    return total;
  };
  const DeleteGear = index => {
    let arrGear = [];
    let itemInArr = listCategories[index];
    let newList = listGear;
    newList[index] = itemInArr;
    setMoney(totalMoney());
    listGear.map(item => {
      if (!item.icon) {
        arrGear.push(item);
      }
    });
    dispatch(getChooseGearRequest(arrGear));
  };
  const addProductsToCart = () => {
    let data = [];
    for (let index = 0; index < listGear.length; index++) {
      let item;
      if (!listGear[index].type) {
        item = listGear[index]._id;
        data.push(item);
      }
    }
    if (data.length > 0) {
      dispatch(getChangeLoadingRequest());
      addProductsToCartApi({productIds: data})
        .then(res => {
          setListGear(listCategories);
          setMoney(0);
          dispatch(getChooseGearRequest([]));
          dispatch(getChangeLoadingSuccess());
          showModal({
            title: 'Th??ng b??o',
            message: 'Th??m v??o gi??? h??ng th??nh c??ng',
          });
        })
        .catch(e => {
          dispatch(getChangeLoadingSuccess());
          showModal({
            title: 'Opps! c?? l???i x??y ra!',
            message: e.response.data.message,
          });
        });
    } else {
      showModal({
        title: 'Opps!',
        message: 'B???n ch??a ch???n s???n ph???m n??o!',
      });
    }
  };
  const onCloseModal = () => {
    setModalVisible(false);
    dispatch(getChangeLoadingSuccess());
  };
  return (
    <View style={styles.container}>
      {/* <Header title={'Build PC'} /> */}
      <ScrollView
        contentContainerStyle={{
          paddingVertical: verticalScale(5),
        }}
        style={styles.body}
        showsVerticalScrollIndicator={false}>
        {listGear.map((item, index) => {
          if (item?.type > 13) {
            return;
          }
          return (
            <ItemChooseGear
              key={Math.random() * 10000}
              item={item}
              onOpenModal={() => {
                setListIndex(index);
                OpenModalChooseGear(index);
              }}
              onDelete={DeleteGear}
              index={index}
            />
          );
        })}
        <View style={styles.viewTotalPrice}>
          <Text style={styles.textTotalPrice}>Chi ph?? d??? t??nh</Text>
          <Text style={styles.textSalePrice}>{formatMoney(money)}</Text>
        </View>
        <CustomButton
          containerStyles={styles.containerButton}
          title={'Th??m v??o gi??? h??ng'}
          onPress={addProductsToCart}
        />
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onCloseModal} style={{flex: 1}} />
          <View style={styles.modalBody}>
            <Text style={styles.textTitle}>Ch???n Gear y??u th??ch</Text>
            <SvgXml
              xml={AppIcon.IconClose}
              height={scale(28)}
              width={scale(28)}
              style={styles.iconClose}
              onPress={onCloseModal}
            />
            <ScrollView
              style={styles.scvProducts}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {listProduct.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => ChooseGear(item)}
                    style={styles.items}
                    key={item._id}>
                    <Image
                      source={{
                        uri: valid
                          ? item?.images[0]
                          : 'https://i.im.ge/2022/10/14/27O9LM.ic-cpu.png',
                      }}
                      resizeMode="cover"
                      style={styles.img}
                    />
                    <View style={styles.viewInfo}>
                      <Text style={styles.textName}>{item?.title}</Text>
                      {item?.salePercent && (
                        <View style={styles.viewCostPrice}>
                          <Text style={styles.textCostPrice}>
                            {formatMoney(item?.costPrice)}
                          </Text>
                          <Text style={styles.textSale}>
                            {item?.salePercent}%
                          </Text>
                        </View>
                      )}
                      <Text style={styles.textSalePrice}>
                        {formatMoney(item?.salePrice)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Explore;
