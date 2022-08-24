import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player1Cards: [],
    player2Cards: [],
    board: {},
  },
  reducers: {
    setPlayer1Cards: (state, action) => ({
      ...state,
      player1Cards: action.payload,
    }),
    setPlayer2Cards: (state, action) => ({
      ...state,
      player2Cards: action.payload,
    }),
    setBoard: (state, action) => ({
      ...state,
      board: action.payload,
    }),
    // turn: (state, action) => { },
  },
});

export const { setPlayer1Cards, setPlayer2Cards, setBoard, turn } =
  gameSlice.actions;

export const getPlayer1Cards = (state) => state.game.player1Cards;
export const getPlayer2Cards = (state) => state.game.player2Cards;

export default gameSlice.reducer;
