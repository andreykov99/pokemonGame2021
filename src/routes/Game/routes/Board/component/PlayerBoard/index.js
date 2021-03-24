import { useState } from 'react';
import PokemonCard from '../../../../../../components/PokemonCard'

import cn from 'classnames';
import s from './style.module.css';




const PlayerBoard = ({ player, cards, onClickCard }) => {
    const [isSelected, setSelected] = useState([]);
    const handleCardClick = (id) => {
        setSelected(id);
        onClickCard && onClickCard(() => {
            const result = cards.filter(item => item.id === id)[0];
            return {
                player,
                ...result,
            }
        });
    }

    return (
        <>
            {
                cards.map(item => (
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
                ))
            }
        </>
    )
}

export default PlayerBoard;