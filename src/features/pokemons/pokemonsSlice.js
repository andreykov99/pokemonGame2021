import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pokemonsService from './pokemonsService';

const get = createAsyncThunk('pokemons/get', async (thunkAPI) => {
  try {
    return await pokemonsService.get();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    status: 'idle',
    data: {},
    message: '',
  },
  extraReducers: {
    [get.pending]: (state) => {
      state.status = 'loading';
      state.message = '';
    },
    [get.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [get.rejected]: (state, action) => {
      state.status = 'error';
      state.data = {};
      state.message = action.payload;
    },
  },
});

export default pokemonsSlice.reducer;
