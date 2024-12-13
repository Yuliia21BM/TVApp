import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  wm: {
    position: 'absolute',
    zIndex: 1,
  },
});
