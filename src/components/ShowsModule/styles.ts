import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {APP_PADDING, SCALE} from '../../utils/Constants';

export const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: SCALE * 32,
    lineHeight: SCALE * 32,
    fontWeight: 'bold',
    color: Colors.white,
    paddingHorizontal: APP_PADDING,
  },
  sectionContainer: {
    paddingLeft: APP_PADDING,
    paddingVertical: SCALE * 54,
  },
});
