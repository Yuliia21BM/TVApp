import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchBannersFromRemoteConfig} from './operations';

interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  isActive?: boolean;
}

interface CommonState {
  banners: Banner[];
  focusedItem: Banner | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommonState = {
  banners: [],
  focusedItem: null,
  loading: false,
  error: null,
};

// Thunk for fetching banners
export const fetchBanners = createAsyncThunk(
  'common/fetchBanners',
  async () => {
    const banners = await fetchBannersFromRemoteConfig(); // Use the function from operations.ts
    return banners;
  },
);

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    addBanner: (state, action: PayloadAction<Banner>) => {
      state.banners.push(action.payload);
    },
    updateBanner: (state, action: PayloadAction<Banner>) => {
      const index = state.banners.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.banners[index] = action.payload;
      }
    },
    removeBanner: (state, action: PayloadAction<string>) => {
      state.banners = state.banners.filter(b => b.id !== action.payload);
    },
    setActiveBanner: (state, action: PayloadAction<string>) => {
      state.banners.forEach(b => {
        b.isActive = b.id === action.payload;
      });
      state.focusedItem =
        state.banners.find(b => b.id === action.payload) || null;
    },
    clearFocusedItem: state => {
      state.focusedItem = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBanners.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banners';
      });
  },
});

export const {
  addBanner,
  updateBanner,
  removeBanner,
  setActiveBanner,
  clearFocusedItem,
} = commonSlice.actions;

export default commonSlice.reducer;
