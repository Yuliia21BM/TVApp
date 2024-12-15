import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {SCALE} from '../../utils/Constants';

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
