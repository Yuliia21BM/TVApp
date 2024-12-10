export enum STACK_SCREENS_TV {
  HOME_SCREEN = 'HomeScreen',
  EPISODE_SCREEN = 'EpisodeScreen',
}
export type AppStackParamListTV = {
  [key in STACK_SCREENS_TV]: undefined;
};
