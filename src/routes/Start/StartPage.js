import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from '../../components/PokemonCard';
import s from './style.module.css';
import { getPokemonsAsync } from '../../features/pokemons/pokemonsSlice';

const StartPage = () => {
  const selectPokemonsData = useSelector((state) => state.pokemons.data);
  const [pokemons, setPokemons] = useState({});
  const navigate = useNavigate();
  const pokemonsRedux = useSelector(selectPokemonsData);
  const dispatch = useDispatch();

  const handleStartGame = () => {
    navigate('/game/board');
  };

  const handleCardClick = (key) => {
    const pokemon = { ...pokemons[key] };
    onSelectedPokemons(key, pokemon);
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
          <button type="button" onClick={clearSelectedPokemons}>
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
                  if (Object.keys(pokemons).length < 5 || selected) {
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
            disabled={Object.keys(pokemons).length < 5}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
};
export { StartPage };
