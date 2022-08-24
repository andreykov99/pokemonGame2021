import { configureStore } from '@reduxjs/toolkit';
import PokemonsReducer from '../features/pokemons/pokemonsSlice';
import GameReducer from '../features/game/gameSlice';
import AuthReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    pokemons: PokemonsReducer,
    game: GameReducer,
  },
});
