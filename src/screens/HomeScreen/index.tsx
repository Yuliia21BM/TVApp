import React, {useEffect, useCallback, useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {selectAllFromCommon} from '../../redux/selectors';
import {type Row} from '../../redux/types';
import {StackNavigationProps} from '../../routes/IRoot';
import {fetchBanners} from '../../redux/operations';
import {styles} from './styles';
import {HomeHeader, ShowsModule} from '../../components';
import {ErrorScreen} from '../../components/ErrorScreen';

export const HomeScreen = ({
  navigation,
}: {
  navigation: StackNavigationProps;
}) => {
  const dispatch = useReduxDispatch();
  const {loading, error, focusedItem, banners, continueWatching} =
    useReduxSelector(selectAllFromCommon);
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);
  useEffect(() => {
    const newRows =
      continueWatching.data.length > 0
        ? [...banners, continueWatching]
        : banners;

    setRows(newRows);
  }, [continueWatching, banners]);

  const renderShowsModule = useCallback(
    ({item}: {item: Row}) => (
      <ShowsModule item={item} navigation={navigation} />
    ),
    [navigation],
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="white" style={styles.loader} />
    );
  }

  if (error) {
    <ErrorScreen error={error} />;
  }

  return (
    <View style={styles.container}>
      <HomeHeader focusedItem={focusedItem} />
      <FlatList
        data={rows}
        renderItem={renderShowsModule}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};
