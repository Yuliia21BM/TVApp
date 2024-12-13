import remoteConfig from '@react-native-firebase/remote-config';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Row} from './types';

export const fetchBannersFromRemoteConfig = async (): Promise<any[]> => {
  try {
    await remoteConfig().fetchAndActivate();

    const bannerData = remoteConfig().getValue('data');

    const parsedBanners = await JSON.parse(bannerData.asString());

    return parsedBanners?.['rows '];
  } catch (error) {
    console.error('Error fetching banners from remote config:', error);
    throw error;
  }
};

export const fetchBanners = createAsyncThunk(
  'common/fetchBanners',
  async () => {
    const rawBanners = await fetchBannersFromRemoteConfig();
    const formattedBanners: Row[] = rawBanners.map((raw: any) => ({
      title: raw.title,
      id: raw.id.toString(),
      data: raw.items, // Ensure raw.items matches Banner[]
    }));
    return formattedBanners;
  },
);
