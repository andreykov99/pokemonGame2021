import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import FirebaseContext from '../../../../context/FirebaseContext';
import PokemonsContext from '../../../../context/PokemonsContext';
import PokemonCard from '../../../../components/PokemonCard';

import s from './style.module.css'

const FinishPage = () => {
    const firebaseContext = useContext(FirebaseContext);
    const { pokemons, pokemons2 } = useContext(PokemonsContext);
    const history = useHistory();
    const [isSelected, setSelected] = useState(null);

    if (Object.keys(pokemons).length === 0) {
        history.replace('/game');
    }

    const handleCardClick = (id) => {
        setSelected(id);
    }

    const handleEndButton = () => {
        const pokemon = pokemons2.filter(item => item.id === isSelected)[0]
        firebaseContext.addPokemon(pokemon, () => history.push('/game'));
    }


    return (
        <div className={s.wrap}>
            <div className={s.playerOne}>
                {
                    Object.values(pokemons)
                        .map(item => (
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
                        ))
                }
            </div>
            <button className={s.btn} onClick={handleEndButton}>END GAME</button>
            <div className={s.playerTwo}>
                {
                    pokemons2.map(item => (
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
                    ))
                }
            </div>
        </div>
    )
}

export default FinishPage;