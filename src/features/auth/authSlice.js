import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, logoutUser, loginUser } from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user || null,
  status: 'idle',
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await registerUser(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await loginUser(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => ({
      user: null,
      status: 'idle',
      message: '',
    }),
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.status = 'pending';
      state.message = '';
    },
    [register.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.user = null;
    },
    [login.pending]: (state) => {
      state.status = 'pending';
      state.message = '';
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.user = null;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.message = '';
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;