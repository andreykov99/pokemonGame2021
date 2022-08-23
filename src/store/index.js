import { configureStore } from '@reduxjs/toolkit';
import PokemonsReducer from '../features/pokemons';
import GameReducer from './game';
import UserReducer from './user';
import AuthReducer from '../features/auth';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    pokemons: PokemonsReducer,
    game: GameReducer,
  },
});
