import defaultPokemons from './pokemons-default-db.json';

export const getPokemons = () => {};
export const addPokemon = () => {};
export const deletePokemon = () => {};
export const getDefaultPokemons = () =>
  Object.entries(defaultPokemons.pokemons).map(([key, pokemon]) => ({
    key,
    ...pokemon,
  }));

const pokemonsService = {
  getPokemons,
  getDefaultPokemons,
  addPokemon,
  deletePokemon,
};

export default pokemonsService;
