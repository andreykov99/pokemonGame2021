import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';

import FirebaseContext from '../../../../context/FirebaseContext';
import PokemonsContext from '../../../../context/PokemonsContext';

import s from './style.module.css'


const StartPage = () => {
    const firebaseContext = useContext(FirebaseContext);
    const pokemonsContext = useContext(PokemonsContext);
    const [pokemons, setPokemons] = useState({});
    const history = useHistory();

    const handleStartGame = () => {
        history.push('/game/board');
    };

    const handleCardClick = (key) => {
        const pokemon = { ...pokemons[key] };
        pokemonsContext.onSelectedPokemons(key, pokemon);
        setPokemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
    }

    useEffect(() => {
        firebaseContext.getPokemonSocket((pokemons) => {
            setPokemons(pokemons);
        })
        return () => firebaseContext.offPokemonSocket();
    }, [firebaseContext]);

    return (
        <>
            <div className={s.root}>
                <h2>This is Game Page!</h2>
                <div><button
                    onClick={handleStartGame}
                    disabled={Object.keys(pokemonsContext.pokemons).length < 5}
                >Start Game</button></div>
                <div className={s.flex}>
                    {Object.entries(pokemons).map(([key, { id, name, type, values, img, selected }]) => <PokemonCard
                        className={s.card}
                        key={key}
                        id={id}
                        name={name}
                        type={type}
                        values={values}
                        img={img}
                        isActive={true}
                        isSelected={selected}
                        handleCardClick={() => {
                            if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
                                handleCardClick(key)
                            }
                        }}
                    />)}
                </div>
            </div>
        </>
    )
}
export default StartPage;