import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PokemonCard from '../../components/PokemonCard';

import s from './style.module.css';

const FinishPage = () => {
  // todo: dummy function will be deleted
  const addPokemon = () => {};
  const player1Cards = useSelector((state) => state.game.player1Cards);
  const player2Cards = useSelector((state) => state.game.player2Cards);

  const navigate = useNavigate();
  const [isSelected, setSelected] = useState(null);

  // if (Object.keys(player1Cards).length === 0) {
  //   navigate('/game', { replace: true });
  // }

  const handleCardClick = (id) => {
    setSelected(id);
  };

  const handleEndButton = () => {
    const pokemon = player2Cards.filter((item) => item.id === isSelected)[0];
    addPokemon(pokemon, () => navigate('/game'));
  };

  return (
    <div className={s.wrap}>
      <div className={s.playerOne}>
        {Object.values(player1Cards).map((item) => (
          <PokemonCard
            className={s.card}
            key={item.id}
            id={item.id}
            name={item.name}
            type={item.type}
            values={item.values}
            img={item.img}
            isActive
          />
        ))}
      </div>
      <button type="button" className={s.btn} onClick={handleEndButton}>
        END GAME
      </button>
      <div className={s.playerTwo}>
        {player2Cards.map((item) => (
          <PokemonCard
            className={s.card}
            key={item.id}
            id={item.id}
            name={item.name}
            type={item.type}
            values={item.values}
            img={item.img}
            isActive
            handleCardClick={handleCardClick}
            isSelected={isSelected === item.id}
          />
        ))}
      </div>
    </div>
  );
};

export { FinishPage };
