import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import uiReducer from '../features/settings/uiSlice.js';
import orderReducer from '../features/orders/orderSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    orders: orderReducer
  }
});
