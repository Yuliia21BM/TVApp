import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Banner, CommonState} from './types';
import {fetchBanners} from './operations';

const initialState: CommonState = {
  banners: [],
  continueWatching: {
    title: 'Continue Watching',
    id: 'continue_watching',
    data: [],
  },
  focusedItem: null,
  loading: false,
  error: null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateContinueWatching: (state, action: PayloadAction<Banner>) => {
      const index = state.continueWatching.data.findIndex(
        b => b.id === action.payload.id,
      );
      if (index === -1) {
        state.continueWatching.data.push(action.payload);
      }
      state.continueWatching.data[index] = action.payload;
    },
    removeContinueWatchingBanner: (state, action: PayloadAction<number>) => {
      state.continueWatching.data = state.continueWatching.data.filter(
        b => b.id !== action.payload,
      );
    },
    setFocusedItem: (state, action: PayloadAction<Banner>) => {
      state.focusedItem = action.payload;
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
  updateContinueWatching,
  removeContinueWatchingBanner,
  setFocusedItem,
} = commonSlice.actions;

export default commonSlice.reducer;
