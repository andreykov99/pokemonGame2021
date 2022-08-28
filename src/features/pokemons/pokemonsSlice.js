import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemons } from './pokemonsService';

export const getPokemonsAsync = createAsyncThunk(
  'pokemons/getPokemonsAsync',
  async (thunkAPI) => {
    try {
      return await getPokemons();
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

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    status: 'idle',
    data: {},
    message: '',
  },
  extraReducers: {
    [getPokemonsAsync.pending]: (state) => {
      state.status = 'loading';
      state.message = '';
    },
    [getPokemonsAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [getPokemonsAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.data = {};
      state.message = action.payload;
    },
  },
});

export default pokemonsSlice.reducer;
