import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {fetchBanners} from '../redux/commonSlice';
import {useReduxDispatch, useReduxSelector} from '../redux/store';
import {selectAllFromCommon} from '../redux/selectors';

export const HomeScreenTV = () => {
  const dispatch = useReduxDispatch();
  const {banners, loading, error} = useReduxSelector(selectAllFromCommon);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.card}>
      <Image
        source={{uri: item.imageSrc}}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="teal" style={{flex: 1}} />;
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View
      style={{flex: 1, backgroundColor: 'teal', justifyContent: 'flex-end'}}>
      <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: 500,
  },
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'red',
  },
  card: {
    width: 300,
    marginHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
