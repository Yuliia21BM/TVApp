import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {SCREEN_HEIGHT, SCALE} from '../../utils/Constants';

export const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
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
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
    paddingVertical: SCALE * 6,
    paddingHorizontal: SCALE * 12,
    borderBottomLeftRadius: SCALE * 16,
  },
  statusText: {
    color: Colors.white,
    fontSize: SCALE * 12,
    lineHeight: SCALE * 14,
    fontWeight: '800',
  },
});
