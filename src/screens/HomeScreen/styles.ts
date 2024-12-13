import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {APP_PADDING, SCALE} from '../../utils/Constants';

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
    paddingBottom: APP_PADDING,
  },
});
