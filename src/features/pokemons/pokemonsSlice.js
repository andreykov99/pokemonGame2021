import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemons, getDefaultPokemons } from './pokemonsService';

const getErrorMessage = (error) =>
  (error.response && error.response.data && error.response.data.message) ||
  error.message ||
  error.toString();

export const getPokemonsAsync = createAsyncThunk(
  'pokemons/getPokemonsAsync',
  async (thunkAPI) => {
    try {
      return await getPokemons();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
export const getDefaultPokemonsAsync = createAsyncThunk(
  'pokemons/getDefaultPokemonsAsync',
  async (thunkAPI) => {
    try {
      return await getDefaultPokemons();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
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
    [getDefaultPokemonsAsync.pending]: (state) => {
      state.status = 'loading';
      state.message = '';
    },
    [getDefaultPokemonsAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [getDefaultPokemonsAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.data = {};
      state.message = action.payload;
    },
  },
});

export default pokemonsSlice.reducer;
