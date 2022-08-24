import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PokemonCard from '../../../../components/PokemonCard';

import PokemonsContext from '../../../../context/PokemonsContext';

import s from './style.module.css';

// import {
//   getPokemonsAsync,
//   selectPokemonsData,
// } from '../../../../features/pokemons';
const getPokemonsAsync = () => {};
const selectPokemonsData = {};

const StartPage = () => {
  // const firebaseContext = useContext(FirebaseContext);
  const pokemonsContext = useContext(PokemonsContext);
  const [pokemons, setPokemons] = useState({});
  const history = useHistory();
  const pokemonsRedux = useSelector(selectPokemonsData);
  const dispatch = useDispatch();

  const handleStartGame = () => {
    history.push('/game/board');
  };

  const handleCardClick = (key) => {
    const pokemon = { ...pokemons[key] };
    pokemonsContext.onSelectedPokemons(key, pokemon);
    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  useEffect(() => {
    dispatch(getPokemonsAsync());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  return (
    <>
      <div className={s.root}>
        <h2>Select 5 cards and click Start</h2>
        <div>
          <button type="button" onClick={pokemonsContext.clearSelectedPokemons}>
            CLEAR
          </button>
        </div>
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { id, name, type, values, img, selected }]) => (
              <PokemonCard
                className={s.card}
                key={key}
                id={id}
                name={name}
                type={type}
                values={values}
                img={img}
                isActive
                isSelected={selected}
                handleCardClick={() => {
                  if (
                    Object.keys(pokemonsContext.pokemons).length < 5 ||
                    selected
                  ) {
                    handleCardClick(key);
                  }
                }}
              />
            )
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={handleStartGame}
            disabled={Object.keys(pokemonsContext.pokemons).length < 5}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
};
export default StartPage;
