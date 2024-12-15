import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  useTVEventHandler,
  HWEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {selectAllFromCommon} from '../../redux/selectors';
import {type Row} from '../../redux/types';
import {StackNavigationProps} from '../../routes/IRoot';
import {fetchBanners} from '../../redux/operations';
import {styles} from './styles';
import {HomeHeader, ShowsModule} from '../../components';
import {ErrorScreen} from '../../components/ErrorScreen';
import {SCALE, SCREEN_HEIGHT} from '../../utils/Constants';

export const HomeScreen = ({
  navigation,
}: {
  navigation: StackNavigationProps;
}) => {
  const dispatch = useReduxDispatch();
  const {loading, error, focusedItem, banners, continueWatching} =
    useReduxSelector(selectAllFromCommon);
  const [rows, setRows] = useState<Row[]>([]);
  const [focusedRow, setFocusedRow] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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

  const getItemLayout = (data: any, index: number) => ({
    length: SCREEN_HEIGHT * 0.3 + SCALE * 20 + SCALE * 32 + SCALE * 54,
    offset:
      (SCREEN_HEIGHT * 0.3 + SCALE * 20 + SCALE * 32 + SCALE * 54) * index,
    index,
  });

  const myTVEventHandler = (evt: HWEvent) => {
    switch (evt.eventType) {
      case 'up':
        if (focusedRow > 0) {
          const newFocusedRow = focusedRow - 1;
          setFocusedRow(newFocusedRow);
          try {
            flatListRef.current?.scrollToIndex({
              index: newFocusedRow,
              animated: true,
            });
          } catch (error) {
            console.warn('Error scrolling to index:', error);
          }
        }
        break;

      case 'down':
        if (focusedRow < rows.length - 1) {
          const newFocusedRow = focusedRow + 1;
          setFocusedRow(newFocusedRow);
          try {
            flatListRef.current?.scrollToIndex({
              index: newFocusedRow,
              animated: true,
            });
          } catch (error) {
            console.warn('Error scrolling to index:', error);
          }
        }
        break;

      default:
        break;
    }
  };

  useTVEventHandler(myTVEventHandler);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="white" style={styles.loader} />
    );
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#150A35', 'rgba(21, 10, 53, 0)']}
        style={styles.bottomGradient}
        start={{x: 0.5, y: 1}}
        end={{x: 0.5, y: 0}}
      />
      <LinearGradient
        colors={['#150A35', 'rgba(21, 10, 53, 0)']}
        style={styles.leftGradient}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
      />
      <HomeHeader focusedItem={focusedItem} />
      <FlatList
        ref={flatListRef}
        data={rows}
        renderItem={renderShowsModule}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={getItemLayout}
        initialScrollIndex={focusedRow}
        onScrollToIndexFailed={error => {
          console.warn('Failed to scroll to index:', error);
        }}
      />
    </View>
  );
};
