import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { setChoiseCard } from '../../features/game/gameSlice';
import PokemonCard from '../PokemonCard';
import s from './style.module.css';

const PlayerBoard = ({ player, cards }) => {
  const dispatch = useDispatch();
  const [isSelected, setSelected] = useState([]);
  const handleCardClick = (id) => {
    setSelected(id);
    const result = cards.filter((item) => item.id === id)[0];
    dispatch(
      setChoiseCard({
        player,
        ...result,
      })
    );
  };

  return (
    <>
      {cards.map((item) => (
        <PokemonCard
          className={cn(s.card, { [s.selected]: isSelected === item.id })}
          minimize
          key={item.key}
          id={item.id}
          name={item.name}
          type={item.type}
          values={item.values}
          img={item.img}
          possession={item.possession}
          isActive
          handleCardClick={handleCardClick}
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
