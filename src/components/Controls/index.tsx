import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useTVEventHandler,
  HWEvent,
  StyleSheet,
} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {styles} from './styles';
import {Colors} from '../../utils/Colors';
import {SCALE} from '../../utils/Constants';

enum BUTTONS_LABELS {
  BACK_BTN_LABEL = 'backBtn',
  NEXT_BTN_LABEL = 'nextBTN',
  PLAY_PAUSE_LABEL = 'playPause',
  SLIDER_LABEL = 'slider',
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
  setIsPaused: (value: boolean) => void;
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
  setIsPaused,
}: IControls): React.JSX.Element {
  const [focusedItem, setFocusedItem] = useState(BUTTONS_LABELS.BACK_BTN_LABEL);

  const handleTVEvent = useCallback(
    (evt: HWEvent) => {
      if (evt.eventType === 'right') {
        if (focusedItem === BUTTONS_LABELS.BACK_BTN_LABEL && isNextEpisode) {
          setFocusedItem(BUTTONS_LABELS.NEXT_BTN_LABEL);
        } else if (focusedItem === BUTTONS_LABELS.PLAY_PAUSE_LABEL) {
          setFocusedItem(BUTTONS_LABELS.SLIDER_LABEL);
          setIsPaused(true);
        } else if (focusedItem === BUTTONS_LABELS.SLIDER_LABEL && isPaused) {
          handleSeek(true);
        }
      } else if (evt.eventType === 'longRight') {
        if (focusedItem === BUTTONS_LABELS.SLIDER_LABEL && isPaused) {
          handleSeek(true);
        }
      } else if (evt.eventType === 'left') {
        if (focusedItem === BUTTONS_LABELS.NEXT_BTN_LABEL) {
          setFocusedItem(BUTTONS_LABELS.BACK_BTN_LABEL);
        } else if (focusedItem === BUTTONS_LABELS.SLIDER_LABEL) {
          if (isPaused) {
            handleSeek(false);
          } else {
            setFocusedItem(BUTTONS_LABELS.PLAY_PAUSE_LABEL);
          }
        }
      } else if (evt.eventType === 'longLeft') {
        if (focusedItem === BUTTONS_LABELS.SLIDER_LABEL && isPaused) {
          handleSeek(false);
        }
      } else if (evt.eventType === 'down') {
        if (
          focusedItem === BUTTONS_LABELS.BACK_BTN_LABEL ||
          focusedItem === BUTTONS_LABELS.NEXT_BTN_LABEL
        ) {
          setFocusedItem(BUTTONS_LABELS.PLAY_PAUSE_LABEL);
        }
      } else if (evt.eventType === 'up') {
        if (
          focusedItem === BUTTONS_LABELS.PLAY_PAUSE_LABEL ||
          focusedItem === BUTTONS_LABELS.SLIDER_LABEL
        ) {
          setFocusedItem(BUTTONS_LABELS.BACK_BTN_LABEL);
        }
      } else if (evt.eventType === 'playPause' || evt.eventType === 'select') {
        if (focusedItem === BUTTONS_LABELS.SLIDER_LABEL) {
          setFocusedItem(BUTTONS_LABELS.PLAY_PAUSE_LABEL);
          setIsPaused(false);
        }
      }
    },
    [
      focusedItem,
      isNextEpisode,
      isPaused,
      currentTime,
      handleSeek,
      handlePressPlayPause,
    ],
  );

  useTVEventHandler(handleTVEvent);

  return (
    <View style={styles.root}>
      <View style={styles.topCantainer}>
        <TouchableOpacity
          activeOpacity={1}
          hasTVPreferredFocus={focusedItem === BUTTONS_LABELS.BACK_BTN_LABEL}
          onPress={handlePressBackButton}
          onFocus={() => setFocusedItem(BUTTONS_LABELS.BACK_BTN_LABEL)}>
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
            activeOpacity={1}
            hasTVPreferredFocus={focusedItem === BUTTONS_LABELS.NEXT_BTN_LABEL}
            onPress={handlePressNextButton}
            onFocus={() => setFocusedItem(BUTTONS_LABELS.NEXT_BTN_LABEL)}>
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
            activeOpacity={1}
            hasTVPreferredFocus={
              focusedItem === BUTTONS_LABELS.PLAY_PAUSE_LABEL
            }
            onPress={handlePressPlayPause}
            onFocus={() => setFocusedItem(BUTTONS_LABELS.PLAY_PAUSE_LABEL)}>
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
          <Text style={styles.timeText}>
            {getMinutesFromSeconds(currentTime)}
          </Text>
          <Slider
            value={currentTime}
            maximumValue={videoDuration}
            containerStyle={StyleSheet.flatten([
              {flex: 1, height: SCALE * 40},
              focusedItem === BUTTONS_LABELS.SLIDER_LABEL
                ? {
                    borderColor: Colors.pink,
                    borderWidth: 2,
                  }
                : {
                    borderColor: Colors.dimGray,
                    borderWidth: 1,
                  },
            ])}
            thumbStyle={styles.sliderThumb}
            minimumTrackTintColor={Colors.pink}
            maximumTrackTintColor={Colors.white}
            thumbTintColor={Colors.pink}
          />

          <Text style={styles.timeText}>
            {getMinutesFromSeconds(videoDuration)}
          </Text>
        </View>
      </View>
    </View>
  );
}
