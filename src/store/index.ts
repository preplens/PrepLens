import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import practiceReducer from './slices/practiceSlice';
import analyticsReducer from './slices/analyticsSlice';
import examReducer from './slices/examSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    practice: practiceReducer,
    analytics: analyticsReducer,
    exam: examReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 