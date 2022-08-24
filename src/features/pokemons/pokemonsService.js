import FireBase from '../../services/firebasePokemons';

const getPokemons = async () => FireBase.getPokemonsOnce();

const pokemonsService = {
  getPokemons,
  addPokemon: () => {},
  deletePokemon: () => {},
};

export default pokemonsService;
