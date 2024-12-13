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
      const existingBannerIndex = state.continueWatching.data.findIndex(
        b => b.id === action.payload.id,
      );

      const updatedData =
        existingBannerIndex === -1
          ? [action.payload, ...state.continueWatching.data]
          : state.continueWatching.data.map((b, index) =>
              index === existingBannerIndex ? action.payload : b,
            );

      return {
        ...state,
        continueWatching: {
          ...state.continueWatching,
          data: updatedData,
        },
      };
    },
    removeContinueWatchingBanner: (state, action: PayloadAction<number>) => {
      const updatedData = state.continueWatching.data.filter(
        b => b.id !== action.payload,
      );

      return {
        ...state,
        continueWatching: {
          ...state.continueWatching,
          data: updatedData,
        },
      };
    },
    setFocusedItem: (state, action: PayloadAction<Banner>) => ({
      ...state,
      focusedItem: action.payload,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBanners.pending, state => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchBanners.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        banners: action.payload,
      }))
      .addCase(fetchBanners.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message || 'Failed to fetch banners',
      }));
  },
});

export const {
  updateContinueWatching,
  removeContinueWatchingBanner,
  setFocusedItem,
} = commonSlice.actions;

export default commonSlice.reducer;
