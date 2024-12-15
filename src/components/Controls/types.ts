export enum BUTTONS_LABELS {
  BACK_BTN_LABEL = 'backBtn',
  NEXT_BTN_LABEL = 'nextBTN',
  PLAY_PAUSE_LABEL = 'playPause',
  SLIDER_LABEL = 'slider',
}

export interface ControlsTypes {
  currentTime: number;
  videoDuration: number;
  isPaused: boolean;
  handlePressPlayPause: () => void;
  handleSeek: (value: boolean) => void;
  focusedBannerTitle: string;
  videTitle: string;
  handlePressNextButton: () => void;
  handlePressBackButton: () => void;
  isNextEpisode: boolean;
  setIsPaused: (value: boolean) => void;
}
