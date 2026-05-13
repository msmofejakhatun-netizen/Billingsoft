import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: { live: [], selectedTable: null },
  reducers: {
    upsertLiveOrder: (state, action) => {
      const index = state.live.findIndex((order) => order._id === action.payload._id);
      if (index >= 0) state.live[index] = action.payload;
      else state.live.unshift(action.payload);
    },
    selectTable: (state, action) => { state.selectedTable = action.payload; }
  }
});

export const { upsertLiveOrder, selectTable } = orderSlice.actions;
export default orderSlice.reducer;
