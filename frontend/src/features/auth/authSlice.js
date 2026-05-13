import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../lib/api.js';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  localStorage.setItem('token', data.data.token);
  return data.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token'), status: 'idle' },
  reducers: { logout: (state) => { state.user = null; state.token = null; localStorage.removeItem('token'); } },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => { state.status = 'loading'; });
    builder.addCase(login.fulfilled, (state, action) => { state.status = 'authenticated'; state.user = action.payload.user; state.token = action.payload.token; });
    builder.addCase(login.rejected, (state) => { state.status = 'error'; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
