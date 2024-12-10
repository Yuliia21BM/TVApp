import remoteConfig from '@react-native-firebase/remote-config';

// Function to fetch and parse banner data from Firebase Remote Config
export const fetchBannersFromRemoteConfig = async (): Promise<any[]> => {
  try {
    // Fetch and activate remote config
    await remoteConfig().fetchAndActivate();

    // Get the banners data (assuming the key is 'banners')
    const bannerData = await remoteConfig().getValue('data');

    // Parse the banners data (assuming it's a JSON string)
    const parsedBanners = JSON.parse(bannerData.asString());
    console.log('parsedBanners', parsedBanners);

    return parsedBanners?.list;
  } catch (error) {
    console.error('Error fetching banners from remote config:', error);
    throw error;
  }
};
