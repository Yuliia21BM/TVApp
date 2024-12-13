import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Video, {OnLoadData, VideoRef} from 'react-native-video';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {selectAllFromCommon} from '../../redux/selectors';
import {Controls} from '../../components';
import {SEEK_TIME} from '../../utils/Constants';
import {styles} from './styles';
import {updateContinueWatching} from '../../redux/commonSlice';
import {STACK_SCREENS, StackNavigationProps} from '../../routes/IRoot';

export const EpisodeScreen = ({
  navigation,
}: {
  navigation: StackNavigationProps;
}) => {
  const {focusedItem} = useReduxSelector(selectAllFromCommon);
  const videoRef = useRef<VideoRef>(null);
  const dispatch = useReduxDispatch();

  const [videoData, setVideoData] = useState({
    currentTime: focusedItem?.time ?? 0,
    videoDuration: 0,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(
    focusedItem?.lastVideoIndex ?? 0,
  );
  const [isNextEpisode, setIsNextEpisode] = useState(true);

  useEffect(() => {
    if (focusedItem) {
      setCurrentVideoIndex(focusedItem.lastVideoIndex ?? 0);
      setVideoData(prev => ({
        ...prev,
        currentTime: focusedItem.time ?? 0,
      }));
    }
  }, [focusedItem]);

  useEffect(() => {
    if (
      focusedItem &&
      focusedItem.videos.length - 1 === focusedItem.lastVideoIndex
    ) {
      setIsNextEpisode(false);
    }
  }, [focusedItem]);

  const onProgress = useCallback(({currentTime}: {currentTime: number}) => {
    setVideoData(prev => ({
      ...prev,
      currentTime,
    }));
  }, []);

  const onPlaybackRateChange = useCallback(
    ({playbackRate}: {playbackRate: number}) => {
      setIsPaused(playbackRate === 0);
    },
    [],
  );

  const onLoad = useCallback(
    (data: OnLoadData) => {
      setIsPaused(false);

      setVideoData(prev => ({
        ...prev,
        videoDuration: data.duration,
      }));

      if (videoData.currentTime > 0) {
        videoRef.current?.seek(videoData.currentTime);
      }
    },
    [videoData.currentTime],
  );

  const handlePressPlayPause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const handleSeek = useCallback(
    (value: boolean) => {
      const {currentTime, videoDuration} = videoData;
      const timeToSeek = value
        ? Math.min(currentTime + SEEK_TIME, videoDuration - 5)
        : Math.max(currentTime - SEEK_TIME, 0);

      videoRef.current?.seek(timeToSeek);
    },
    [videoData],
  );

  const handlePressBackButton = () => {
    if (focusedItem) {
      dispatch(
        updateContinueWatching({
          ...focusedItem,
          time: videoData.currentTime,
          lastVideoIndex: currentVideoIndex,
        }),
      );
    }
    navigation.navigate(STACK_SCREENS.HOME_SCREEN);
  };

  const handlePressNextButton = () => {
    const nextIndex = currentVideoIndex + 1;

    if (focusedItem) {
      dispatch(
        updateContinueWatching({
          ...focusedItem,
          lastVideoIndex: nextIndex,
          time: 0,
        }),
      );
    }

    setCurrentVideoIndex(nextIndex);
    setVideoData(prev => ({
      ...prev,
      currentTime: 0,
    }));

    videoRef.current?.seek(0);

    if (focusedItem && focusedItem?.videos.length - 1 === nextIndex) {
      setIsNextEpisode(false);
    }
  };

  if (!focusedItem?.videos) {
    return <View style={{flex: 1, backgroundColor: 'red'}}></View>;
  }
  const video = focusedItem.videos[currentVideoIndex];

  return (
    <View style={styles.root}>
      <Video
        ref={videoRef}
        controls={false}
        onPlaybackRateChange={onPlaybackRateChange}
        paused={isPaused}
        onLoad={onLoad}
        resizeMode="contain"
        onError={err => console.log(err)}
        onProgress={onProgress}
        source={{
          uri: video.src,
        }}
        style={styles.video}
      />
      <Controls
        currentTime={videoData.currentTime}
        videoDuration={videoData.videoDuration}
        isPaused={isPaused}
        handlePressPlayPause={handlePressPlayPause}
        handleSeek={handleSeek}
        focusedBannerTitle={focusedItem.title}
        videTitle={video.title}
        handlePressBackButton={handlePressBackButton}
        handlePressNextButton={handlePressNextButton}
        isNextEpisode={isNextEpisode}
      />
    </View>
  );
};
