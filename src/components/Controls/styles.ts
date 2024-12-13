import {StyleSheet} from 'react-native';
import {APP_PADDING, SCALE} from '../../utils/Constants';
import {Colors} from '../../utils/Colors';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    padding: APP_PADDING,
  },
  topCantainer: {
    flexDirection: 'row',
    gap: SCALE * 40,
  },
  topButton: {
    width: SCALE * 56,
    height: SCALE * 56,
    resizeMode: 'contain',
  },

  middleTextContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    gap: SCALE * 24,
  },
  videoTitle: {
    color: Colors.white,
    lineHeight: SCALE * 57,
    fontSize: SCALE * 48,
    textShadowColor: '#FFFFFF', // Shadow color
    textShadowOffset: {width: 2, height: 2}, // Shadow position
    textShadowRadius: 20, // Shadow blur
  },
  bannerTitle: {
    fontSize: SCALE * 24,
    lineHeight: SCALE * 29,
    color: Colors.white,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCALE * 24,
  },
  sliderWrapper: {
    flex: 1,
    height: SCALE * 10,
  },
  sliderThumb: {
    width: SCALE * 20,
    height: SCALE * 20,
    borderRadius: SCALE * 10,
  },
  timeWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: SCALE * 24,
    color: Colors.white,
  },
  playPauseButton: {
    width: SCALE * 80,
    height: SCALE * 80,
    resizeMode: 'contain',
  },
});
