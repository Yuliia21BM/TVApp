import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {SCREEN_HEIGHT, SCALE} from '../../utils/Constants';

export const styles = StyleSheet.create({
  cardContainer: {
    marginRight: SCALE * 20,
    borderRadius: SCALE * 16,
    overflow: 'hidden',
  },
  card: {
    width: SCREEN_HEIGHT * 0.2,
    height: SCREEN_HEIGHT * 0.3,
    borderStyle: 'solid',
  },
  cardActive: {
    borderColor: Colors.white,
    borderWidth: 2,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SCALE * 10,
  },
});
