type Video = {
  id: number;
  title: string;
  src: string;
};

export enum BannerStatus {
  TOP = 'TOP',
  NEW = 'NEW',
  EXCLUSIVE = 'EXCLUSIVE',
}
export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  banner: string;
  videos: Video[];
  time?: number;
  lastVideoIndex?: number;
  status: BannerStatus | null;
}

export type Row = {
  title: string;
  id: string;
  data: Banner[];
};

export interface CommonState {
  banners: Row[];
  continueWatching: Row;
  focusedItem: Banner | null;
  loading: boolean;
  error: string | null;
  isFirstLoad: boolean;
}
