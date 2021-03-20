import { useState, useEffect } from 'react';
import PokemonCard from '../../components/PokemonCard';

import database from '../../services/firebase';

import cn from 'classnames';
import styles from './style.module.css'


const GamePage = () => {

    const [pokemons, setPokemons] = useState({});
    const handleCardClick = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = { ...item[1] };
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    database.ref('pokemons/' + item[0] + '/active').set(pokemon.active);
                };
                acc[item[0]] = pokemon;
                return acc;
            }, {});
        });
    }

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    }, [])

    return (
        <>
            <div className={cn(styles.root, styles.flex)}>
                <h2>This is Game Page!</h2>
            </div>
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
        </>
    )
}
export default GamePage;