import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import urlSlice from './slices/urlSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    urls: urlSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
