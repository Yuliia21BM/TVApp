import React, {memo, useCallback, useRef, useState} from 'react';
import {
  Animated,
  findNodeHandle,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {setFocusedItem, setIsFirstLoad} from '../../redux/commonSlice';
import {STACK_SCREENS} from '../../routes/types';
import {BannerStatus} from '../../redux/types';
import {styles} from './styles';
import {StatusColors} from '../../utils/Colors';
import {selectIsFirstLoad} from '../../redux/selectors';
import {ShowBannerProps} from './types';

export const ShowBanner = memo(
  ({
    item,
    index,
    isFirstRow,
    isLastElementInRow,
    navigation,
    setFocusedIndex,
    onFocusCallback,
    setSelectedShowRef,
  }: ShowBannerProps) => {
    const dispatch = useReduxDispatch();
    const isFirstLoad = useReduxSelector(selectIsFirstLoad);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const ref = useRef<View>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Focus handler
    const handleFocus = useCallback(() => {
      onFocusCallback();
      dispatch(setFocusedItem(item));
      setFocusedIndex(index);
      setIsFocused(true);

      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [dispatch, item, index, onFocusCallback, setFocusedIndex, scaleAnim]);

    // Play handler
    const handlePlay = useCallback(() => {
      dispatch(setIsFirstLoad(false));
      setSelectedShowRef(ref);
      dispatch(setFocusedItem(item));
      navigation.navigate(STACK_SCREENS.EPISODE_SCREEN);
    }, [dispatch, item, navigation, setSelectedShowRef]);

    // Blur handler
    const handleBlur = useCallback(() => {
      setIsFocused(false);

      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [scaleAnim]);

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {transform: [{scale: scaleAnim}]},
          isFocused && styles.cardActive,
        ]}>
        {item.status && (
          <View
            style={[
              styles.statusContainer,
              {backgroundColor: StatusColors[item.status as BannerStatus]},
            ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
        <TouchableOpacity
          ref={ref}
          style={styles.card}
          nextFocusUp={
            isFirstRow ? findNodeHandle(ref.current) ?? undefined : undefined
          }
          nextFocusLeft={
            index === 0 ? findNodeHandle(ref.current) ?? undefined : undefined
          }
          nextFocusRight={
            isLastElementInRow
              ? findNodeHandle(ref.current) ?? undefined
              : undefined
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          onLayout={() => {
            if (index === 0 && Platform.OS === 'android' && isFirstLoad) {
              setSelectedShowRef(ref);
            }
          }}
          onPress={handlePlay}
          activeOpacity={1}>
          <FastImage
            source={{uri: item.image}}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Animated.View>
    );
  },
);
