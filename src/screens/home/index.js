import {View, Text, Image, ScrollView, Pressable, RefreshControl} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {styles} from './styles';
import CustomTextInput from '../../components/customTextInput';
import AppIcon from '../../assets/icons';
import CustomProduct from '../../components/customProduct';
import {AppTheme} from '../../config/AppTheme';
import {scale} from '../../utils/scale';
import ItemCategories from './components/ItemCategories';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllProductsByTypeRequest,
  getAllProductsRequest,
} from '../../redux/products/action';
import {getProductsSelector} from '../../redux/products/selector';
import PlaceholderListCategories from '../../components/placeholderListCategories';
import {getListCategoriesSelector} from '../../redux/categories/selector';
import {getListBannerRequest} from '../../redux/banner/action';
import {getListBannerSelector} from '../../redux/banner/selector';
import {useNavigation} from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {getListCategoriesRequest} from '../../redux/categories/action';
import PlaceholderListBanner from '../../components/placeholderBanner';
import PlaceholderProductOnHome from '../../components/placeholderProductOnHome';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const onMore = useCallback(
    title => {
      if (title === 'category') {
        navigation.navigate('ListProduct', {type: -1});
      }
    },
    [dispatch],
  );
  const onDetail = id => {
    return navigation.navigate('ProductDetail', {productId: id});
  };
  useEffect(() => {
    dispatch(getAllProductsRequest());
    dispatch(getListCategoriesRequest());
    dispatch(getListBannerRequest());
  }, [dispatch]);
  const listProduct = useSelector(getProductsSelector);
  const listCategories = useSelector(getListCategoriesSelector);
  const listBanner = useSelector(getListBannerSelector);
  const [data, setData] = useState(listProduct);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const onListProductByCategories = useCallback(
    (_id, type) => {
      navigation.navigate('ListProduct', {type: type});
    },
    [dispatch],
  );
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllProductsRequest());
    dispatch(getListCategoriesRequest());
    dispatch(getListBannerRequest());
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View style={styles.body}>
        <View style={styles.viewTextInput}>
          <CustomTextInput
            leftIcon={AppIcon.IconSearch}
            textPlaceHolder={'Tìm kiếm sản phẩm'}
            containerTextInputStyle={styles.margins}
            value={search}
            onFocus={() => navigation.navigate('SearchScreen')}
          />
          <SvgXml
            xml={AppIcon.IconHeartRed}
            width={scale(24)}
            height={scale(24)}
            style={styles.icon}
            onPress={() => navigation.navigate('Favorites')}
          />
          <SvgXml
            style={styles.icon}
            xml={AppIcon.IconBell}
            width={scale(24)}
            height={scale(24)}
            onPress={() => navigation.navigate('Notification')}
          />
        </View>

        <View style={styles.img}>
          {listBanner.length > 0 ? (
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={2}
              showPagination
              autoplayLoopKeepAnimation
              paginationStyleItemActive={styles.dotActive}
              paginationStyleItemInactive={styles.dotInActive}
              paginationStyle={{
                alignItems: 'center',
              }}
              data={listBanner}
              renderItem={({item}) => {
                return (
                  <View style={styles.viewCarousel}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.itemImage}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <PlaceholderListBanner />
          )}
        </View>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>Danh mục</Text>
          <Pressable onPress={() => onMore('category')}>
            <Text style={styles.textMore}>Xem tất cả</Text>
          </Pressable>
        </View>
        {listCategories.length > 0 ? (
          <ScrollView
            style={styles.containerCategories}
            horizontal={true}
            contentContainerStyle={{paddingHorizontal: scale(16)}}
            showsHorizontalScrollIndicator={false}>
            {listCategories.map(item => {
              return (
                <ItemCategories
                  onPress={onListProductByCategories}
                  key={item?._id}
                  title={item?.title}
                  icon={item?.icon}
                  type={item?.type}
                  _id={item?._id}
                />
              );
            })}
          </ScrollView>
        ) : (
          <PlaceholderListCategories />
        )}
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>Flash Sale</Text>
        </View>
        {listProduct.length > 0 ? (
          <ScrollView
            style={styles.containerCategories}
            horizontal={true}
            contentContainerStyle={{paddingLeft: scale(16)}}
            showsHorizontalScrollIndicator={false}>
            {listProduct.map(item => {
              return (
                <CustomProduct
                  key={item?._id}
                  title={item?.title}
                  image={item?.images[0]}
                  costPrice={item?.costPrice}
                  salePrice={item?.salePrice}
                  salePercent={item?.salePercent}
                  onGoDetail={() => onDetail(item._id)}
                  containerStyle={styles.itemProductStyle}
                />
              );
            })}
          </ScrollView>
        ) : (
          <PlaceholderProductOnHome />
        )}
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>Mega Sale</Text>
          {/* <Pressable onPress={() => onMore('category')}>
            <Text style={styles.textMore}>Xem Thêm</Text>
          </Pressable> */}
        </View>
        <ScrollView
          style={styles.containerCategories}
          horizontal={true}
          contentContainerStyle={{paddingLeft: scale(16)}}
          showsHorizontalScrollIndicator={false}>
          {listProduct.map(item => {
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
        <View style={styles.viewTitle}>
          <Text style={[styles.textTitle, {color: AppTheme.Colors.Red}]}>
            Sản phẩm hot
          </Text>
        </View>
        <View style={{paddingHorizontal: scale(6)}}>
          <ScrollView
            style={styles.scrollContainerHotProduct}
            contentContainerStyle={styles.scrollViewHotProduct}>
            {listProduct.map(item => {
              return (
                <CustomProduct
                  key={item._id}
                  title={item.title}
                  image={item.images[0]}
                  costPrice={item.costPrice}
                  salePrice={item.salePrice}
                  salePercent={item.salePercent}
                  onGoDetail={() => onDetail(item._id)}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
