import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCT8hjyah_BH_lW1IN2-laxjFDkhER1kjw",
    authDomain: "pokemon-game-939fe.firebaseapp.com",
    databaseURL: "https://pokemon-game-939fe-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-939fe",
    storageBucket: "pokemon-game-939fe.appspot.com",
    messagingSenderId: "719445172974",
    appId: "1:719445172974:web:e286a395ac1395d55a49ff"
};

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



export default Firebase;