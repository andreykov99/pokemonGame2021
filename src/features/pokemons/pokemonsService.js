import defaultPokemons from './pokemons-default-db.json';

export const getPokemons = () => {};
export const addPokemon = () => {};
export const deletePokemon = () => {};
export const getDefaultPokemons = () => defaultPokemons;

const pokemonsService = {
  getPokemons,
  getDefaultPokemons,
  addPokemon,
  deletePokemon,
};

export default pokemonsService;
