import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/Constants';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.dimGray,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  main: {
    width: 400,
    height: 170,
    backgroundColor: Colors.dimGray,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
});
