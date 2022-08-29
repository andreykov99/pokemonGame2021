import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
  const [player2Pokemons, setPlayer2Pokemons] = useState({});

  const handleSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };

  const handleClearSelected = () => {
    setSelectedPokemons({});
  };

  return <Outlet />;
};

export { GamePage };
