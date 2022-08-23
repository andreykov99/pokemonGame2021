import { configureStore } from '@reduxjs/toolkit';
import PokemonsReducer from '../features/pokemons';
import GameReducer from '../features/game';
import AuthReducer from '../features/auth';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    pokemons: PokemonsReducer,
    game: GameReducer,
  },
});
