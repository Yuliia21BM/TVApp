import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

import {styles} from './styles';
import {Colors} from '../../utils/Colors';

enum BUTTONS_LABELS {
  BACK_BTN_LABEL = 'backBtn',
  NEXT_BTN_LABEL = 'nextBTN',
  PLAY_PAUSE_LABEL = 'playPause',
}

const getMinutesFromSeconds = (time: number): string => {
  const minutes = time >= 60 ? Math.floor(time / 60) : 0;
  const seconds = Math.floor(time - minutes * 60);

  return `${minutes >= 10 ? minutes : `0${minutes}`}:${
    seconds >= 10 ? seconds : `0${seconds}`
  }`;
};

interface IControls {
  currentTime: number;
  videoDuration: number;
  isPaused: boolean;
  handlePressPlayPause: () => void;
  handleSeek: (value: boolean) => void;
  focusedBannerTitle: string;
  videTitle: string;
  handlePressNextButton: () => void;
  handlePressBackButton: () => void;
  isNextEpisode: boolean;
}

export function Controls({
  currentTime,
  videoDuration,
  isPaused,
  handlePressPlayPause,
  handleSeek,
  focusedBannerTitle,
  videTitle,
  handlePressNextButton,
  handlePressBackButton,
  isNextEpisode,
}: IControls): React.JSX.Element {
  const [focusedItem, setFocusedItem] = useState('');

  const handleItemFocus = useCallback((value: string) => {
    setFocusedItem(value);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.topCantainer}>
        <TouchableOpacity
          hasTVPreferredFocus={true}
          activeOpacity={1}
          onPress={handlePressBackButton}
          onFocus={() => {
            handleItemFocus(BUTTONS_LABELS.BACK_BTN_LABEL);
          }}>
          <Image
            source={
              focusedItem === BUTTONS_LABELS.BACK_BTN_LABEL
                ? require('../../../assets/icons/ArrowBackActive.png')
                : require('../../../assets/icons/ArrowBack.png')
            }
            style={styles.topButton}
          />
        </TouchableOpacity>
        {isNextEpisode && (
          <TouchableOpacity
            hasTVPreferredFocus={true}
            activeOpacity={1}
            onPress={handlePressNextButton}
            onFocus={() => {
              handleItemFocus(BUTTONS_LABELS.NEXT_BTN_LABEL);
            }}>
            <Image
              source={
                focusedItem === BUTTONS_LABELS.NEXT_BTN_LABEL
                  ? require('../../../assets/icons/NextActive.png')
                  : require('../../../assets/icons/Next.png')
              }
              style={styles.topButton}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', gap: 50}}>
        <View style={styles.middleTextContainer}>
          <Text style={styles.videoTitle}>{videTitle}</Text>
          <Text style={styles.bannerTitle}>{focusedBannerTitle}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            hasTVPreferredFocus={true}
            activeOpacity={1}
            onPress={handlePressPlayPause}
            onFocus={() => {
              handleItemFocus(BUTTONS_LABELS.PLAY_PAUSE_LABEL);
            }}>
            <Image
              source={
                isPaused
                  ? focusedItem === BUTTONS_LABELS.PLAY_PAUSE_LABEL
                    ? require('../../../assets/icons/PlayActive.png')
                    : require('../../../assets/icons/Play.png')
                  : focusedItem === BUTTONS_LABELS.PLAY_PAUSE_LABEL
                  ? require('../../../assets/icons/PauseActive.png')
                  : require('../../../assets/icons/Pause.png')
              }
              style={styles.playPauseButton}
            />
          </TouchableOpacity>
          <Text accessible={false} style={styles.timeText}>
            {`${getMinutesFromSeconds(currentTime)}`}
          </Text>
          <Slider
            value={currentTime}
            maximumValue={videoDuration}
            containerStyle={styles.sliderWrapper}
            thumbStyle={styles.sliderThumb}
            minimumTrackTintColor={Colors.pink}
            maximumTrackTintColor={Colors.white}
            thumbTintColor={Colors.pink}
          />
          <Text accessible={false} style={styles.timeText}>
            {`${getMinutesFromSeconds(videoDuration)}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
