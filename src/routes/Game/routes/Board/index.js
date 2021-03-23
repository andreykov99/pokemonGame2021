import { useContext } from 'react';

import PokemonCard from '../../../../components/PokemonCard';
import PokemonsContext from '../../../../context/PokemonsContext';

import s from './style.module.css';

const BoardPage = () => {
    const { pokemons } = useContext(PokemonsContext);

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                {
                    Object.values(pokemons).map(({ id, name, type, values, img }) => (
                        <PokemonCard
                            className={s.card}
                            minimize
                            key={id}
                            id={id}
                            name={name}
                            type={type}
                            values={values}
                            img={img}
                            isActive
                        />
                    ))
                }
            </div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;