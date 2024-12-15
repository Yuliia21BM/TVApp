import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const SEEK_TIME = 2;

export const SCALE = SCREEN_WIDTH / 1920; // Assuming 1920px is the base width for scaling
export const APP_PADDING = SCALE * 64; // Base padding
