import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../components/customTextInput';
import {styles} from './styles';
import MyLoading from '../../components/loading';
import CustomProduct from '../../components/customProduct';
import {SvgXml} from 'react-native-svg';
import AppIcon from '../../assets/icons';
import {scale} from '../../utils/scale';
import {getProductByTitleApi} from '../../services/api/products';
import Header from '../../components/header';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const [isShowListProduct, setIsShowListProduct] = useState(false);
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(true);
  const navigation = useNavigation();
    const focused = useIsFocused();
    useEffect(() => {
      setFirst(true)
    }, [focused])

  const findProduct = () => {
    if (title.trim() === '') return;
    setLoading(true);
    setFirst(false);
    getProductByTitleApi(title.trim())
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert('Có lỗi gì đó đã xảy ra !', error);
        setLoading(false);
      });
  };
  const onDetail = id => {
    return navigation.navigate('ProductDetail', {productId: id});
  };
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
  return (
    <View style={styles.container}>
      <Header title={'Tìm kiếm'} iconBack />
      <View style={{paddingHorizontal: scale(16)}}>
        <CustomTextInput
        textPlaceHolder={'Tìm kiếm'}
        value={title}
        onChangeText={text => setTitle(text)}
        // onFocus={() => {
        //   console.log('on focused');
        // }}
        autoFocus={true}
        onEndEditing={findProduct}
        containerTextInputStyle={styles.containerTextInputStyle}
        rightIcon={AppIcon.IconSearch}
      />
      </View>
      
      <View style={styles.body}>
        {!first && (
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
              <View style={styles.viewEmpty}>
                <SvgXml
                  xml={AppIcon.IconNotFound}
                  width={scale(128)}
                  height={scale(128)}
                />
                <Text style={styles.textEmpty}>Không tìm thấy sản phẩm!</Text>
              </View>
            }
          />
        )}
      </View>
      {loading && <MyLoading />}
    </View>
  );
};

export default SearchScreen;
