import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../hooks/useError';
import { getCards, getBoard, getPlayersTurn } from './gameService';

export const getPlayer2CardsAsync = createAsyncThunk(
  'game/getPlayer2CardsAsync',
  async (thunkAPI) => {
    try {
      return await getCards();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getBoardAsync = createAsyncThunk(
  'game/getBoardAsync',
  async (thunkAPI) => {
    try {
      return await getBoard();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getPlayersTurnAsync = createAsyncThunk(
  'game/getPlayersTurnAsync',
  async (params, thunkAPI) => {
    try {
      return await getPlayersTurn(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player1Cards: [],
    player2Cards: [],
    board: [],
    steps: 0,
    choiseCard: null,
  },
  reducers: {
    setPlayerCards: (state, action) => {
      state.player1Cards = action.payload;
    },
    setChoiseCard: (state, action) => {
      state.choiseCard = action.payload;
    },
  },
  extraReducers: {
    [getPlayer2CardsAsync.pending]: (state) => {
      state.status = 'loading';
      state.message = '';
    },
    [getPlayer2CardsAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.player2Cards = action.payload;
    },
    [getPlayer2CardsAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.player2Cards = [];
      state.message = action.payload;
    },
    [getBoardAsync.pending]: (state) => {
      state.status = 'loading';
      state.message = '';
    },
    [getBoardAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.board = action.payload;
    },
    [getBoardAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.board = [];
      state.message = action.payload;
    },
    [getPlayersTurnAsync.pending]: (state) => {
      state.status = 'loading';
      state.message = '';
    },
    [getPlayersTurnAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      if (state.choiseCard.player === 1) {
        const index = state.player1Cards.findIndex(
          (pokemon) => pokemon.key === state.choiseCard.key
        );
        state.player1Cards[index].isPlayed = true;
      } else {
        const index = state.player2Cards.findIndex(
          (pokemon) => pokemon.key === state.choiseCard.key
        );
        state.player2Cards[index].isPlayed = true;
      }

      // if (state.choiseCard.player === 1) {
      //   state.player1Cards = state.player1Cards.filter(
      //     (item) => item.id !== state.choiseCard.id
      //   );
      // }
      // if (state.choiseCard.player === 2) {
      //   state.player2Cards = state.player2Cards.filter(
      //     (item) => item.id !== state.choiseCard.id
      //   );
      // }
      state.board = action.payload;
      state.steps += 1;
      state.choiseCard = null;
    },
    [getPlayersTurnAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.board = [];
      state.message = action.payload;
    },
  },
});

export const { setPlayerCards, setChoiseCard } = gameSlice.actions;

export default gameSlice.reducer;
