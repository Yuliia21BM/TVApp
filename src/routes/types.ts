import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum STACK_SCREENS {
  HOME_SCREEN = 'HomeScreen',
  EPISODE_SCREEN = 'EpisodeScreen',
}
export type AppStackParamList = {
  [key in STACK_SCREENS]: undefined;
};
export type StackNavigationProps = NativeStackNavigationProp<AppStackParamList>;
