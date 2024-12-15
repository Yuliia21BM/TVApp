import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {APP_PADDING, SCALE} from '../../utils/Constants';

export const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  errorText: {
    width: '70%',
    color: Colors.red,
    fontSize: SCALE * 32,
  },
});
