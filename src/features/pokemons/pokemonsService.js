import FireBase from '../../services/firebase';

export const get = async () => {
  return await FireBase.getPokemonsOnce();
};

const pokemonsService = {
  get,
};

export default pokemonsService;
