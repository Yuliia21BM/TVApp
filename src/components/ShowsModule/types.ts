import {RefObject} from 'react';
import {Row} from '../../redux/types';
import {StackNavigationProps} from '../../routes/types';
import {View} from 'react-native';

export interface ShowsModuleProps {
  item: Row;
  isFirstRow: boolean;
  navigation: StackNavigationProps;
  onFocusCallback: () => void;
  setSelectedShowRef: (data: RefObject<View>) => void;
}
