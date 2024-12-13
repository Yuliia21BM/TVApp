type Video = {
  id: number;
  title: string;
  src: string;
};
export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  banner: string;
  videos: Video[];
  time?: number;
  lastVideoIndex?: number;
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
}
