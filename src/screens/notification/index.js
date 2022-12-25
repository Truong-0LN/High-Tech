import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/header';
import {AppTheme} from '../../config/AppTheme';
import {scale} from '../../utils/scale';
import ItemNotifi from './components/ItemNotifi';
import {useDispatch, useSelector} from 'react-redux';
import {getNotificationSelector} from '../../redux/notification/selector';
import {getNotificationRequest} from '../../redux/notification/action';
import {getChangeLoading} from '../../redux/loading/selector';
import MyLoading from '../../components/loading';
import {getChangeLoadingRequest} from '../../redux/loading/action';
import { useNavigation } from '@react-navigation/native';



const Notification = () => {
  const listNotification = useSelector(getNotificationSelector);
  const loading = useSelector(getChangeLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotificationRequest());
    dispatch(getChangeLoadingRequest());
  }, [dispatch]);
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    console.log(item?.information.order
      );
    return (
      <ItemNotifi
        title={item.title}
        description={item.description}
        date_created={item.createdAt}
        onPress={()=>navigation.navigate('OrderDetail', {orderId:  item.information.order})}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header title="Thông báo" iconBack />
      <View style={styles.body}>
        <FlatList
          renderItem={renderItem}
          data={listNotification}
          keyExtractor={item => item._id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
  },
  body: {
    paddingHorizontal: scale(16),
    flex: 1,
    backgroundColor: AppTheme.Colors.White,
    borderTopWidth: 0.5,
    borderColor: AppTheme.Colors.Dark,
  },
});
