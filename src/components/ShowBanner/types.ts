import {RefObject} from 'react';
import {Banner} from '../../redux/types';
import {StackNavigationProps} from '../../routes/types';
import {View} from 'react-native';

export interface ShowBannerProps {
  item: Banner;
  index: number;
  isFirstRow: boolean;
  isLastElementInRow: boolean;
  navigation: StackNavigationProps;
  setFocusedIndex: (index: number) => void;
  onFocusCallback: () => void;
  setSelectedShowRef: (data: RefObject<View>) => void;
}
