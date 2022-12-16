import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import Header from '../../components/header';
import {DATA_PRODUCTS} from '../../services/fakeApi/fakeAPI';
import CustomProduct from '../../components/customProduct';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getListFavoriteSelector} from '../../redux/products/selector';
import {getAllFavoriteProductRequest} from '../../redux/products/action';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../assets/icons';
import {scale} from '../../utils/scale';
import MyLoading from '../../components/loading';
import {getChangeLoading} from '../../redux/loading/selector';
import { getChangeLoadingRequest } from '../../redux/loading/action';

const Favorites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listFavorite = useSelector(getListFavoriteSelector);
  const isLoading = useSelector(getChangeLoading);
  useEffect(() => {
    dispatch(getChangeLoadingRequest({loading: true}));
    dispatch(getAllFavoriteProductRequest());
  }, []);
  const renderItem = ({item}) => {
    return (
      <CustomProduct
        onGoDetail={() =>
          navigation.navigate('ProductDetail', {productId: item._id})
        }
        costPrice={item.costPrice}
        image={item.images[0]}
        salePercent={item.salePercent}
        salePrice={item.salePrice}
        title={item.title}
        containerStyle={styles.itemContainer}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header iconBack title={'Sản phẩm yêu thích'} />
      <View style={styles.body}>
        <FlatList
          data={listFavorite}
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
              <Text style={styles.text}>Không có sản phẩm yêu thích nào!</Text>
            </View>
          }
        />
      </View>
      {isLoading && <MyLoading />}
    </View>
  );
};

export default Favorites;
