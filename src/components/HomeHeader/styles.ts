import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  APP_PADDING,
  SCALE,
} from '../../utils/Constants';

export const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: APP_PADDING,
    paddingVertical: 10,
    height: '45%',
    width: '55%',
  },
  logo: {
    resizeMode: 'contain',
    width: SCALE * 200,
    height: (SCALE * 200) / 2,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  maskedView: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: SCREEN_WIDTH * 0.45,
    height: SCREEN_HEIGHT * 0.5,
  },
  gradientOverlayLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20%',
    height: '100%',
  },
  gradientOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40%',
  },
  bannerTitle: {
    fontSize: SCALE * 32,
    lineHeight: SCALE * 38,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: APP_PADDING * 0.5,
  },
  bannerDescription: {
    fontSize: SCALE * 24,
    lineHeight: SCALE * 29,
    color: Colors.white,
  },
});
