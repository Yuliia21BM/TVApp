import {memo, useCallback, useRef} from 'react';
import {Banner} from '../../redux/types';
import {STACK_SCREENS, StackNavigationProps} from '../../routes/IRoot';
import {Animated, TouchableOpacity} from 'react-native';
import {useReduxDispatch} from '../../redux/store';
import {setFocusedItem} from '../../redux/commonSlice';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

export const ShowBunner = memo(
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

    const handleFocus = useCallback(
      (item: Banner, index: number) => {
        dispatch(setFocusedItem(item));
        setFocusedIndex(index);
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
          focusedIndex === index && styles.cardActive,
        ]}>
        <TouchableOpacity
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
