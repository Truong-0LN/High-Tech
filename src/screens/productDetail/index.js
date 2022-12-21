import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {styles} from './styles';
import Header from '../../components/header';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../assets/icons';
import {scale, verticalScale} from '../../utils/scale';
import CustomButton from '../../components/customButton';
import CustomProduct from '../../components/customProduct';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllProductsByTypeRequest,
  getProductRequest,
} from '../../redux/products/action';
import {
  getProductByTypeSelector,
  getProductSelector,
} from '../../redux/products/selector';
import {formatMoney} from '../../helpers/formatMoney';
import PlaceholderProduct from '../../components/placeholderProduct';
import {addOneProductToCartRequest} from '../../redux/cart/action';
import {
  changeFavoriteApi,
  getCheckFavoriteApi,
} from '../../services/api/products';
import withLoading from '../../HOC/withLoading';
import {GET_PRODUCT_REQUEST} from '../../redux/products/actionType';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {getListCategoriesSelector} from '../../redux/categories/selector';
const ProductDetail = props => {
  const productId = props.route.params.productId;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = useSelector(getProductSelector);
  const listCategorie = useSelector(getListCategoriesSelector);
  const list = useSelector(getProductByTypeSelector);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    dispatch(getProductRequest(productId));
    setIsFavorite(product.favorite);
    setCount(0);
  }, []);
  useEffect(() => {
    const result = listCategorie.filter(item => item._id === product.category);
    const category = result[0];
    if (category) {
      dispatch(getAllProductsByTypeRequest(category.type));
    }
    setIsFavorite(product.favorite);
  }, [product]);

  const onDetail = id => {
    dispatch(getProductRequest(id));
  };
  const onChangeFavorite = useCallback(() => {
    setLoading(true);
    changeFavoriteApi({productId: productId, favorite: !isFavorite})
      .then(res => {
        dispatch(getProductRequest(productId));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('onChangeFavorite -> ', error);
      });
  }, [loading, product, isFavorite]);
  const addToCart = useCallback(
    productId => {
      if (count < 5) {
        setCount(count + 1);
        dispatch(
          addOneProductToCartRequest(
            {productId: productId, quantity: 1},
            () => {
              ToastAndroid.show(
                'Thêm vào giỏ hàng thành công',
                ToastAndroid.SHORT,
              );
            },
          ),
        );
      } else {
        ToastAndroid.show('Phát hiện bất thường', ToastAndroid.SHORT);
      }
    },
    [dispatch, count],
  );
  return (
    <View style={styles.container}>
      <Header title={'Chi tiết sản phẩm'} iconBack />
      {product._id !== undefined ? (
        <ScrollView style={styles.body}>
          <View style={styles.img}>
            <SwiperFlatList
              index={0}
              showPagination
              autoplayLoopKeepAnimation
              paginationStyleItemActive={styles.dotActive}
              paginationStyleItemInactive={styles.dotInActive}
              paginationStyle={{
                alignItems: 'center',
              }}
              data={product.images}
              renderItem={({item}) => {
                return (
                  <View style={styles.viewCarousel}>
                    <Image
                      source={{uri: item}}
                      resizeMode="contain"
                      style={styles.itemImage}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.viewName}>
            <Text numberOfLines={3} style={styles.textName}>
              {product?.title}
            </Text>
            <TouchableOpacity onPress={onChangeFavorite}>
              <SvgXml
                xml={
                  product?.favorite ? AppIcon.IconHeartRed : AppIcon.IconHeart
                }
                width={scale(24)}
                height={scale(24)}
                style={{marginTop: verticalScale(5)}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewDescription}>
            {product?.description.map((item, index) => {
              return (
                <Text key={index} style={styles.text}>
                  {item}
                </Text>
              );
            })}
          </View>
          <View style={styles.viewPrice}>
            <CustomButton
              title={'Thêm vào giỏ hàng'}
              containerStyles={styles.btnAddToCart}
              onPress={() => addToCart(product._id)}
            />

            <View style={{left: -scale(20)}}>
              <Text style={styles.textPrice}>
                {formatMoney(product?.salePrice)}
              </Text>
              <View style={styles.fdl}>
                <Text style={styles.textLastPrice}>
                  {formatMoney(product?.costPrice)}
                </Text>
                <Text style={styles.textDiscount}>{product?.salePercent}%</Text>
              </View>
            </View>
          </View>
          <Text style={styles.textQuantity}>
            Số lượng : {product?.quantity}
          </Text>
          <View style={styles.viewSpecifications}>
            <Text style={styles.textTitle}>Thông số kĩ thuật</Text>
            <View style={styles.viewContent}>
              {product?.specifications.map((item, index) => {
                return (
                  <View
                    style={{flexDirection: 'row', borderWidth: 0.5, flex: 1}}
                    key={index}>
                    <Text style={styles.textTitleSpecifications}>
                      {item?.title}
                    </Text>
                    <Text style={styles.textContentSpecifications}>
                      {item?.content}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Text style={styles.textTitleSame}>Sản phẩm tương tự</Text>
          <View style={styles.viewAlso}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {list.map(item => {
                return (
                  <CustomProduct
                    key={item?._id}
                    title={item?.title}
                    image={item?.images[0]}
                    costPrice={item?.costPrice}
                    salePrice={item?.salePrice}
                    salePercent={item?.salePercent}
                    onGoDetail={() => onDetail(item?._id)}
                    containerStyle={styles.itemProductStyle}
                  />
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <PlaceholderProduct />
      )}
    </View>
  );
};

export default ProductDetail;
