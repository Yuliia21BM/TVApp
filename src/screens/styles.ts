import {StyleSheet} from 'react-native';

import {Colors} from '../utils/Colors';

const SHOW_BLOCK_WIDTH = 400;

export const styles = StyleSheet.create({
  text: {
    color: Colors.white,
  },
  banner: {
    height: 480,
    width: '100%',
    marginVertical: 20,
  },
  sectionHeader: {
    color: Colors.white,
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  showsContainer: {
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  showBlock: {
    width: SHOW_BLOCK_WIDTH,
    height: (SHOW_BLOCK_WIDTH * 9) / 16 + 80,
    marginHorizontal: 20,
  },
  showBlockImageBlock: {
    width: '100%',
    height: (SHOW_BLOCK_WIDTH * 9) / 16,
  },
  showBlockImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  showTitle: {
    color: Colors.white,
    fontSize: 28,
    marginTop: 20,
    textAlign: 'center',
  },
});
