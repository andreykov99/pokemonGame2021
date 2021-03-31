import { configureStore } from '@reduxjs/toolkit';
import PokemonsReducer from './pokemons';

export default configureStore({
    reducer: {
        pokemons: PokemonsReducer,
    }
})
