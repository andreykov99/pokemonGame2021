import { configureStore } from '@reduxjs/toolkit';
import PokemonsReducer from './pokemons';
import GameReducer from './game';

export default configureStore({
    reducer: {
        pokemons: PokemonsReducer,
        game: GameReducer,
    }
})
