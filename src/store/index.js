import { configureStore } from '@reduxjs/toolkit';
import PokemonsReducer from './pokemons';
import GameReducer from './game';
import UserReducer from './user';

export default configureStore({
    reducer: {
        pokemons: PokemonsReducer,
        user: UserReducer,
        game: GameReducer,
    }
})
