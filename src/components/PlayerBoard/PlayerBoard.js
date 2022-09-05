import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { setChoiseCard } from '../../features/game/gameSlice';
import PokemonCard from '../PokemonCard';
import s from './style.module.css';

const PlayerBoard = ({ player, cards }) => {
  const dispatch = useDispatch();
  const playerCards = cards.filter((pokemon) => !pokemon.isPlayed);
  const [isSelected, setSelected] = useState([]);
  const handleCardClick = (key) => {
    setSelected(key);
    const result = cards.filter((item) => item.key === key)[0];
    dispatch(
      setChoiseCard({
        player,
        ...result,
      })
    );
  };

  return (
    <>
      {playerCards.map((item) => (
        <PokemonCard
          className={cn(s.card, { [s.selected]: isSelected === item.key })}
          minimize
          key={item.key}
          id={item.id}
          name={item.name}
          type={item.type}
          values={item.values}
          img={item.img}
          possession={item.possession}
          isActive
          handleCardClick={() => handleCardClick(item.key)}
        />
      ))}
    </>
  );
};
PlayerBoard.propTypes = {
  player: PropTypes.number,
  cards: PropTypes.array,
};
export { PlayerBoard };
