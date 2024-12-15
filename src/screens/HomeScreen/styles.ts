import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {SCALE, SCREEN_HEIGHT} from '../../utils/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,
  },
  contentContainer: {
    paddingBottom: SCREEN_HEIGHT * 0.55,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCALE * 140,
    zIndex: 100,
  },
  leftGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: SCALE * 50,
    zIndex: 100,
  },
});
