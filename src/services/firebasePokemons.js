import firebase from 'firebase/app';
import 'firebase/database';

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = firebase.database();
  }

  getPokemonSocket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    });
  };

  offPokemonSocket = () => {
    this.database.ref('pokemons').off('value');
  };

  getPokemonsOnce = async () => {
    const snapshot = await this.database.ref('pokemons').once('value');
    return snapshot.val();
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (pokemon, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database
      .ref(`pokemons/${newKey}`)
      .set(pokemon)
      .then(() => cb());
  };
}

export const userSignUp = async ({ email, password }) => {
  const params = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  };
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCT8hjyah_BH_lW1IN2-laxjFDkhER1kjw',
    params
  ).then((resp) => resp.json());

  return response;
};

const FireBase = new Firebase();

export default FireBase;
