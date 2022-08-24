import FireBase from '../../services/firebase';

const getPokemons = async () => FireBase.getPokemonsOnce();

const pokemonsService = {
  getPokemons,
  addPokemon: () => {},
  deletePokemon: () => {},
};

export default pokemonsService;
