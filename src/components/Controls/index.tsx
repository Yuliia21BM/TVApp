import React, {RefObject, useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useTVEventHandler,
  HWEvent,
  TVFocusGuideView,
} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {styles} from './styles';
import {Colors} from '../../utils/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {getMinutesFromSeconds} from '../../utils';
import {BUTTONS_LABELS, ControlsTypes} from './types';

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
}: ControlsTypes): React.JSX.Element {
  const [focusedItem, setFocusedItem] = useState(BUTTONS_LABELS.BACK_BTN_LABEL);
  const [horizontalDestination, setHorizontalDestination] =
    useState<RefObject<View> | null>(null);
  const [verticalDestination, setVerticalDestination] =
    useState<RefObject<View> | null>(null);

  const sliderRef = useRef<View>(null);
  const playPauseRef = useRef<View>(null);
  const backRef = useRef<View>(null);

  const handleTVEvent = useCallback(
    (evt: HWEvent) => {
      if (focusedItem === BUTTONS_LABELS.SLIDER_LABEL) {
        if (evt.eventType === 'right') {
          handleSeek(true);
        } else if (evt.eventType === 'left') {
          handleSeek(false);
        } else if (
          evt.eventType === 'select' ||
          evt.eventType === 'playPause'
        ) {
          playPauseRef.current?.requestTVFocus();
        }
      }
    },
    [focusedItem, handleSeek],
  );

  useTVEventHandler(handleTVEvent);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        playPauseRef.current?.requestTVFocus();
      }, 100);
    }, []),
  );

  return (
    <View style={styles.root}>
      <View style={styles.topCantainer}>
        <TouchableOpacity
          activeOpacity={1}
          ref={backRef}
          onPress={handlePressBackButton}
          onFocus={() => {
            setFocusedItem(BUTTONS_LABELS.BACK_BTN_LABEL);
            setVerticalDestination(playPauseRef);
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
            activeOpacity={1}
            onPress={handlePressNextButton}
            onFocus={() => {
              setFocusedItem(BUTTONS_LABELS.NEXT_BTN_LABEL);
              setVerticalDestination(playPauseRef);
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
      <View style={styles.focusView}>
        <TVFocusGuideView
          destinations={
            verticalDestination?.current ? [verticalDestination.current] : []
          }
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.middleTextContainer}>
          <Text style={styles.videoTitle}>{videTitle}</Text>
          <Text style={styles.bannerTitle}>{focusedBannerTitle}</Text>
        </View>
        <View style={styles.footer}>
          <TVFocusGuideView
            destinations={
              horizontalDestination?.current
                ? [horizontalDestination.current]
                : []
            }>
            <TouchableOpacity
              activeOpacity={1}
              ref={playPauseRef}
              onPress={handlePressPlayPause}
              onFocus={() => {
                setFocusedItem(BUTTONS_LABELS.PLAY_PAUSE_LABEL);
                setHorizontalDestination(sliderRef);
                setVerticalDestination(backRef);
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
          </TVFocusGuideView>
          <Text style={styles.timeText}>
            {getMinutesFromSeconds(currentTime)}
          </Text>
          <TVFocusGuideView
            style={styles.sliderWrapper}
            destinations={
              horizontalDestination?.current
                ? [horizontalDestination.current]
                : []
            }>
            <TouchableOpacity
              activeOpacity={1}
              ref={sliderRef}
              style={[
                styles.slider,
                focusedItem === BUTTONS_LABELS.SLIDER_LABEL &&
                  styles.focusedSlider,
              ]}
              onFocus={() => {
                setHorizontalDestination(sliderRef);
                setIsPaused(true);
                setTimeout(() => {
                  setFocusedItem(BUTTONS_LABELS.SLIDER_LABEL);
                }, 100);
              }}
              onBlur={() => {
                setIsPaused(false);
              }}>
              <Slider
                value={currentTime}
                maximumValue={videoDuration}
                thumbStyle={styles.sliderThumb}
                minimumTrackTintColor={Colors.pink}
                maximumTrackTintColor={Colors.white}
                thumbTintColor={Colors.pink}
              />
            </TouchableOpacity>
          </TVFocusGuideView>
          <Text style={styles.timeText}>
            {getMinutesFromSeconds(videoDuration)}
          </Text>
        </View>
      </View>
    </View>
  );
}
