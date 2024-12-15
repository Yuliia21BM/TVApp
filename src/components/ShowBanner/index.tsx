import React, {memo, useCallback, useRef, useState} from 'react';
import {Animated, Platform, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useReduxDispatch} from '../../redux/store';
import {setFocusedItem} from '../../redux/commonSlice';
import {STACK_SCREENS, StackNavigationProps} from '../../routes/IRoot';
import {Banner, BannerStatus} from '../../redux/types';
import {styles} from './styles';
import {StatusColors} from '../../utils/Colors';

export const ShowBanner = memo(
  ({
    item,
    index,
    navigation,
    setFocusedIndex,
    focusedIndex,
  }: {
    item: Banner;
    index: number;
    navigation: StackNavigationProps;
    setFocusedIndex: (index: number) => void;
    focusedIndex: number;
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const dispatch = useReduxDispatch();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(
      (item: Banner, index: number) => {
        dispatch(setFocusedItem(item));
        setFocusedIndex(index);
        setIsFocused(true);
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
      [dispatch, setFocusedIndex, scaleAnim],
    );

    const handlePlay = useCallback(
      (item: Banner) => {
        dispatch(setFocusedItem(item));
        navigation.navigate(STACK_SCREENS.EPISODE_SCREEN);
      },
      [dispatch, navigation],
    );

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
          hasTVPreferredFocus={
            focusedIndex === index && Platform.OS === 'android' ? true : false
          }
          style={styles.card}
          onFocus={() => handleFocus(item, index)}
          onBlur={handleBlur}
          onPress={() => handlePlay(item)}
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
