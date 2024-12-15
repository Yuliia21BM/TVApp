import {BannerStatus} from '../redux/types';

export const Colors = {
  black: '#000000',
  white: '#ffffff',
  dimGray: 'rgba(30,30,30,0.85)',
  primaryBackground: '#150A35',
  red: '#aa0000',
  pink: '#FF358A',
  green: '#2BCA46',
  violet: '#7B17F6',
  shadow: 'rgba(21, 10, 53, 0)',
};

export const StatusColors = {
  [BannerStatus.TOP]: Colors.pink,
  [BannerStatus.NEW]: Colors.green,
  [BannerStatus.EXCLUSIVE]: Colors.violet,
};
