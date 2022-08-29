import PropTypes from 'prop-types';
import cn from 'classnames';
import { useState } from 'react';
import PokemonCard from '../PokemonCard';

import s from './style.module.css';

const PlayerBoard = ({ player, cards, onClickCard }) => {
  const [isSelected, setSelected] = useState([]);
  const handleCardClick = (id) => {
    setSelected(id);
    onClickCard(() => {
      const result = cards.filter((item) => item.id === id)[0];
      return {
        player,
        ...result,
      };
    });
  };

  return (
    <>
      {cards.map((item) => (
        <PokemonCard
          className={cn(s.card, { [s.selected]: isSelected === item.id })}
          minimize
          key={item.id}
          id={item.id}
          name={item.name}
          type={item.type}
          values={item.values}
          img={item.img}
          isActive
          handleCardClick={handleCardClick}
        />
      ))}
    </>
  );
};
PlayerBoard.propTypes = {
  player: PropTypes.object,
  cards: PropTypes.array,
  onClickCard: PropTypes.func,
};
export { PlayerBoard };
