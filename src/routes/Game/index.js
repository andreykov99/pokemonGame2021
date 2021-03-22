import { useState, useEffect, useContext } from 'react';
import PokemonCard from '../../components/PokemonCard';

import FirebaseContext from '../../context/FirebaseContext';

import cn from 'classnames';
import styles from './style.module.css'


const GamePage = () => {
    const firebase = useContext(FirebaseContext);
    const [pokemons, setPokemons] = useState({});
    console.log('#### firebase', firebase);

    const handleAddPokemon = () => {
        const getRandomInt = (max) => {
            return Math.floor(Math.random() * Math.floor(max));
        }
        const pokemonsArray = Object.entries(pokemons);
        firebase.addPokemon(pokemonsArray[getRandomInt(5)][1]);
    };

    const handleCardClick = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = { ...item[1] };
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                };
                acc[item[0]] = pokemon;

                firebase.postPokemon([item[0]], pokemon);

                return acc;
            }, {});
        });
    }

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setPokemons(pokemons);
        });
    }, [])

    return (
        <>
            <div className={cn(styles.root, styles.flex)}>
                <h2>This is Game Page!</h2>
                <div><button onClick={handleAddPokemon}>Add New Pokemon</button></div>
                <div className={styles.flex}>
                    {Object.entries(pokemons).map(([key, { id, name, type, values, img, active }]) => <PokemonCard
                        key={key}
                        id={id}
                        name={name}
                        type={type}
                        values={values}
                        img={img}
                        isActive={active}
                        handleCardClick={handleCardClick}
                    />)}
                </div>
            </div>
        </>
    )
}
export default GamePage;