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
    }

    offPokemonSocket = () => {
        this.database.ref('pokemons').off('value');
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon);
    }

    addPokemon = (pokemon, cb) => {
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref(`pokemons/${newKey}`).set(pokemon).then(() => cb());
    }
}

const FireBase = new Firebase();

export default FireBase;
