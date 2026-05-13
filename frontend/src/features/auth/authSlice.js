import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../lib/api.js';

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const parseStoredUser = () => {
  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (_error) {
    localStorage.removeItem('user');
    return null;
  }
};
const apiError = (error) => error.response?.data?.message || error.message || 'Authentication request failed';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return data.data;
  } catch (error) {
    return rejectWithValue(apiError(error));
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data.data;
  } catch (error) {
    return rejectWithValue(apiError(error));
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/auth/me');
    return data.data;
  } catch (error) {
    return rejectWithValue(apiError(error));
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await api.post('/auth/logout');
  } catch (_error) {
    // JWT logout is stateless; always clear the local session even if the token is expired.
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return true;
});

const persistSession = (state, payload) => {
  const accessToken = payload.accessToken || payload.token;
  state.user = payload.user;
  state.token = accessToken;
  state.status = 'authenticated';
  state.error = null;
  localStorage.setItem('token', accessToken);
  localStorage.setItem('user', JSON.stringify(payload.user));
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: parseStoredUser(),
    token: storedToken,
    status: storedToken ? 'authenticated' : 'idle',
    error: null
  },
  reducers: {
    clearAuthError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(login.fulfilled, (state, action) => persistSession(state, action.payload))
      .addCase(login.rejected, (state, action) => { state.status = 'error'; state.error = action.payload; })
      .addCase(register.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(register.fulfilled, (state, action) => persistSession(state, action.payload))
      .addCase(register.rejected, (state, action) => { state.status = 'error'; state.error = action.payload; })
      .addCase(fetchCurrentUser.pending, (state) => { state.status = state.token ? 'refreshing' : 'idle'; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'authenticated';
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
        state.error = null;
      });
  }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
