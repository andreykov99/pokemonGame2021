import { useState } from 'react';
import PokemonCard from '../../components/PokemonCard';

import cn from 'classnames';
import styles from './style.module.css'

const GamePage = ({ POKEMONS }) => {
    const [myPokemons, changePokemons] = useState(POKEMONS);
    const handleCardClick = (id) => {
        changePokemons(pre => (pre.map(item => ({ ...item, ...(item.id === Number(id) && { active: true }) }))));

    }
    return (
        <>
            <div className={cn(styles.root, styles.flex)}>
                <h2>This is Game Page!</h2>
            </div>
            <div className={styles.flex}>
                {myPokemons.map((item) => <PokemonCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    values={item.values}
                    img={item.img}
                    isActive={item.active}
                    handleCardClick={handleCardClick}
                />)}
            </div>
        </>
    )
}
export default GamePage;