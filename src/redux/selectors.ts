import {RootState} from './store';

export const selectAllBunners = (state: RootState) => state.common.banners;
export const selectFocusedItem = (state: RootState) => state.common.focusedItem;
export const selectError = (state: RootState) => state.common.error;
export const selectLoading = (state: RootState) => state.common.loading;
export const selectAllFromCommon = (state: RootState) => state.common;
