import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from '../../components/PokemonCard';
import s from './style.module.css';
import {
  getDefaultPokemonsAsync,
  selectPokemonCard,
} from '../../features/pokemons/pokemonsSlice';
import { setPlayerCards } from '../../features/game/gameSlice';

const StartPage = () => {
  const pokemons = useSelector((state) => state.pokemons.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSelectedPokemons = () =>
    pokemons ? pokemons.filter((pokemon) => pokemon.selected === true) : [];

  const handleStartGame = () => {
    dispatch(
      setPlayerCards(
        getSelectedPokemons().map((pokemon) => ({
          ...pokemon,
          possession: 'blue',
          player: 1,
        }))
      )
    );
    navigate('/game/board');
  };

  const handleCardClick = (key) => {
    dispatch(selectPokemonCard(key));
  };

  useEffect(() => {
    dispatch(getDefaultPokemonsAsync());
  }, [dispatch]);

  return (
    <>
      <div className={s.root}>
        <h2>Select 5 cards and click Start</h2>
        <div>
          {/* todo: */}
          <button type="button" onClick={() => {}}>
            CLEAR
          </button>
        </div>
        <div className={s.flex}>
          {pokemons ? (
            pokemons.map(({ key, id, name, type, values, img, selected }) => (
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
                  if (getSelectedPokemons().length < 5 || selected) {
                    handleCardClick(key);
                  }
                }}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={handleStartGame}
            disabled={getSelectedPokemons().length < 5}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
};
export { StartPage };
