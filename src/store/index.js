import { configureStore } from '@reduxjs/toolkit';
import PokemonReducer from './pokemon';
import GameReducer from './game';
import UserReducer from './user';

export default configureStore({
  reducer: {
    pokemons: PokemonReducer,
    users: UserReducer,
    game: GameReducer,
  },
});
