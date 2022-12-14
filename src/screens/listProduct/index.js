import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/header';
import {AppTheme} from '../../config/AppTheme';
import {scale, verticalScale} from '../../utils/scale';
import {DATA_CATEGORIES, DATA_PRODUCTS} from '../../services/fakeApi/fakeAPI';
import ItemCategories from '../home/components/ItemCategories';
import CustomProduct from '../../components/customProduct';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import RangeSlider from 'rn-range-slider';
import {getListCategoriesSelector} from '../../redux/categories/selector';
import {
  getProductByTypeSelector,
  getProductsSelector,
} from '../../redux/products/selector';
import IMAGES from '../../assets/images';
import {getAllProductsByTypeRequest} from '../../redux/products/action';
import {
  getChangeLoadingFailed,
  getChangeLoadingRequest,
  getChangeLoadingSuccess,
} from '../../redux/loading/action';
import {getChangeLoading} from '../../redux/loading/selector';
import MyLoading from '../../components/loading';
import CustomTextInput from '../../components/customTextInput';
import AppIcon from '../../assets/icons';
import {SvgXml} from 'react-native-svg';
import ReactNativeModal from 'react-native-modal';
import {getListBrandRequest} from '../../redux/brand/action';
import {getListBrandSelector} from '../../redux/brand/selector';
import {style} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import RnRangeSlider from 'rn-range-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomButton from '../../components/customButton';
import {formatMoney} from '../../helpers/formatMoney';
import {
  getProductByFilter,
  getProductBySort,
} from '../../services/api/products';
import {showModal} from '../../components/customNotiModal';
const ListProduct = props => {
  const listCategories = useSelector(getListCategoriesSelector);
  const listProduct = useSelector(getProductsSelector);
  const listProductByType = useSelector(getProductByTypeSelector);
  const [typeCategory, setTypeCategory] = useState(props?.route.params.type);
  const [multiSliderValue, setMultiSliderValue] = React.useState([0, 50]);
  const dispatch = useDispatch();
  const loading = useSelector(getChangeLoading);
  const listBrand = useSelector(getListBrandSelector);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listChooseBrand, setListChooseBrand] = useState([]);
  const [data, setData] = useState(listProductByType);
  const navigation = useNavigation();
  const [type_sort, setType_sort] = useState('+salePrice');
  useEffect(() => {
    dispatch(getListBrandRequest());
    if (typeCategory === '') {
    } else if (typeCategory === -1) {
      dispatch(getAllProductsByTypeRequest(''));
      dispatch(getChangeLoadingRequest());
    } else {
      dispatch(getAllProductsByTypeRequest(typeCategory));
      dispatch(getChangeLoadingRequest());
    }
    setData(listProductByType);
  }, []);
  useEffect(() => {
    setData(listProductByType);
  }, [listProductByType]);

  const multiSliderValuesChange = values => setMultiSliderValue(values);
  const renderItem = ({item}) => {
    return (
      <CustomProduct
        key={item?._id}
        title={item?.title}
        image={item?.images[0]}
        costPrice={item?.costPrice}
        salePrice={item?.salePrice}
        salePercent={item?.salePercent}
        onGoDetail={() => onDetail(item._id)}
        containerStyle={styles.itemStyle}
      />
    );
  };
  const onDetail = id => {
    return navigation.navigate('ProductDetail', {productId: id});
  };
  const changeCategory = useCallback(
    (_id, type) => {
      if (type !== -1) {
        dispatch(getChangeLoadingRequest());
        dispatch(getAllProductsByTypeRequest(type));
        setTypeCategory(type);
      } else {
        dispatch(getChangeLoadingRequest());
        dispatch(getAllProductsByTypeRequest(''));
        setTypeCategory(type);
      }
      setData(listProductByType);
    },
    [dispatch, data, typeCategory],
  );
  const onOpenModal = () => {
    setIsModalVisible(true);
  };
  const onChooseBrand = _id => {
    if (listChooseBrand.includes(_id)) {
      setListChooseBrand(prev => prev.filter(id => id !== _id));
    } else {
      setListChooseBrand(prev => [...prev, _id]);
    }
  };
  const onFilter = () => {
    const minSalePrice = multiSliderValue[0] * 1000000;
    const maxSalePrice = multiSliderValue[1] * 1000000;
    const brands = listChooseBrand.toString();
    dispatch(getChangeLoadingRequest());
    getProductByFilter(brands, minSalePrice, maxSalePrice)
      .then(res => {
        dispatch(getChangeLoadingSuccess());
        setData(res?.data);
        setIsModalVisible(false);
        setTypeCategory('');
      })
      .catch(error => {
        dispatch(getChangeLoadingSuccess());
        showModal({
          title: 'Oops!!',
          message: 'Có lỗi xảy ra! thử lại sau nhé',
        });
      });
  };
  const onResetFilter = () => {
    setListChooseBrand([]);
    setMultiSliderValue([0, 50]);
  };
  const onReverse = () => {
    const minSalePrice = multiSliderValue[0] * 1000000;
    const maxSalePrice = multiSliderValue[1] * 1000000;
    const brands = listChooseBrand.toString();
    dispatch(getChangeLoadingRequest());
    getProductByFilter(brands, minSalePrice, maxSalePrice, type_sort)
      .then(res => {
        setData(res?.data);
        setIsModalVisible(false);
        dispatch(getChangeLoadingSuccess());
        setTypeCategory('');
        if (type_sort === '+salePrice') {
          setType_sort('-salePrice');
        } else {
          setType_sort('+salePrice');
        }
      })
      .catch(error => {
        dispatch(getChangeLoadingSuccess());
        showModal({
          title: 'Oops!!',
          message: 'Có lỗi xảy ra! thử lại sau nhé',
        });
      });
  };
  return (
    <View style={styles.container}>
      <Header title={'Danh mục sản phẩm'} iconBack />

      <View style={styles.viewFillter}>
        <CustomTextInput
          leftIcon={AppIcon.IconSearch}
          textPlaceHolder={'Tìm kiếm'}
          containerTextInputStyle={styles.containerTextInputStyle}
          onFocus={() => navigation.navigate('SearchScreen')}
        />
        <TouchableOpacity onPress={onOpenModal} style={styles.touchFilter}>
          <SvgXml
            xml={AppIcon.IconFilter}
            width={scale(24)}
            height={scale(24)}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onReverse}>
          <SvgXml
            xml={
              type_sort === '+salePrice'
                ? AppIcon.IconSortTopToBottom
                : AppIcon.IconSortBottomToTop
            }
            width={scale(24)}
            height={scale(24)}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <ScrollView
          style={styles.containerCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: scale(16),
          }}>
          <ItemCategories
            key={21}
            title={'Tất cả'}
            type={-1}
            onPress={changeCategory}
            _id={-1}
            containerStyle={typeCategory === -1 && styles.choosedCategory}
          />
          {listCategories.map(item => {
            return (
              <ItemCategories
                key={item?._id}
                title={item?.title}
                icon={item?.icon}
                type={item?.type}
                onPress={changeCategory}
                containerStyle={
                  typeCategory === item?.type && styles.choosedCategory
                }
              />
            );
          })}
        </ScrollView>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          ListEmptyComponent={
            <View style={styles.containerEmpty}>
              <SvgXml
                xml={AppIcon.IconNotFound}
                width={scale(124)}
                height={scale(124)}
              />
              <Text style={styles.text}>Không có sản phẩm nào!</Text>
            </View>
          }
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut={'bounceInDown'}
        animationInTiming={300}>
        <View style={styles.modalContainer}>
          <Text style={styles.textTitle}>Tìm kiếm theo: </Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={styles.touchClose}>
            <SvgXml
              xml={AppIcon.IconClose}
              height={scale(24)}
              width={scale(24)}
            />
          </TouchableOpacity>
          <View style={styles.viewFillterBrand}>
            <Text style={styles.textType}>Nhãn hàng</Text>
            {listBrand.length > 0 && (
              <FlatList
                data={listBrand}
                renderItem={({item}) => {
                  const isChoice = listChooseBrand.includes(item._id);
                  return (
                    <TouchableOpacity
                      onPress={() => onChooseBrand(item._id)}
                      style={[
                        styles.touchBrand,
                        {
                          backgroundColor: isChoice
                            ? AppTheme.Colors.Puple
                            : AppTheme.Colors.White,
                        },
                      ]}
                      key={item._id}>
                      <Text style={styles.textItem}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item._id}
                numColumns={3}
                columnWrapperStyle={styles.wrapperStyle}
              />
            )}
          </View>
          <View>
            <Text style={styles.textType}>Giá bán</Text>
            <MultiSlider
              values={[multiSliderValue[0], multiSliderValue[1]]}
              sliderLength={scale(320)}
              onValuesChange={multiSliderValuesChange}
              min={0}
              max={50}
              step={1}
              allowOverlap
              snapped
              containerStyle={{alignItems: 'center'}}
              trackStyle={{width: '100%', height: verticalScale(5)}}
              selectedStyle={{backgroundColor: AppTheme.Colors.Puple}}
            />

            <View style={styles.viewPrice}>
              <View style={styles.viewMinMax}>
                <Text style={styles.textMinMax}>
                  {formatMoney(multiSliderValue[0] * 1000000)}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.textMinMax}>-</Text>
              </View>

              <View style={styles.viewMinMax}>
                <Text style={styles.textMinMax}>
                  {formatMoney(multiSliderValue[1] * 1000000)}
                </Text>
              </View>
            </View>
            <View style={styles.viewTouch}>
              <CustomButton
                containerStyles={[
                  styles.touch,
                  {backgroundColor: AppTheme.Colors.White},
                ]}
                textStyles={{color: AppTheme.Colors.Dark}}
                title={'Mặc định'}
                onPress={onResetFilter}
              />
              <CustomButton
                containerStyles={styles.touch}
                title={'Xem kết quả'}
                onPress={onFilter}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  containerEmpty: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(220),
  },
  textType: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Black,
    fontWeight: '700',
    marginLeft: scale(22),
  },
  textMinMax: {
    fontSize: AppTheme.FontSize.Medium,
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Black,
  },
  viewMinMax: {
    borderWidth: 0.3,
    borderColor: AppTheme.Colors.Dark,
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: verticalScale(8),
  },
  touch: {
    width: scale(120),
    backgroundColor: AppTheme.Colors.Dark,
    marginRight: scale(20),
  },
  viewTouch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(30),
  },
  viewPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  touchClose: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: verticalScale(10),
    right: scale(10),
    padding: scale(10),
  },
  itemPrice: {
    borderWidth: 1,
    width: scale(100),
    height: verticalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  viewFillterPrice: {},
  textItem: {
    fontSize: AppTheme.FontSize.SmallX,
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Black,
  },
  wrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  viewFillterBrand: {
    flex: 1,
    marginTop: verticalScale(30),
  },
  touchBrand: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(100),
    height: verticalScale(35),
    borderRadius: 6,
    marginTop: verticalScale(10),
  },
  textTitle: {
    fontSize: AppTheme.FontSize.Medium,
    fontWeight: '700',
    fontFamily: AppTheme.Fonts.SemiBold,
    color: AppTheme.Colors.Dark,
    marginTop: verticalScale(20),
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  icon: {
    marginLeft: scale(15),
  },
  containerTextInputStyle: {
    flex: 1,
  },
  viewFillter: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosedCategory: {
    backgroundColor: AppTheme.Colors.Blue,
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
    paddingTop: verticalScale(15),
  },
  containerCategories: {
    backgroundColor: AppTheme.Colors.White,
    borderRadius: scale(5),
    minHeight: verticalScale(150),
    elevation: 3,
    shadowColor: AppTheme.Colors.SecondBackround,
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingBottom: verticalScale(15),
    paddingHorizontal: scale(8),
  },
  flatList: {
    paddingHorizontal: scale(16),
    height: verticalScale(660),
  },
  itemStyle: {
    marginBottom: verticalScale(0),
  },
});
