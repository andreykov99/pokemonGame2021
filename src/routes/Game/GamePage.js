import { useState } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

import PokemonsContext from '../../context/PokemonsContext';

import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';

const GamePage = () => {
  const match = useRouteMatch();
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

  return (
    <PokemonsContext.Provider
      value={{
        pokemons: selectedPokemons,
        onSelectedPokemons: handleSelectedPokemons,
        clearSelectedPokemons: handleClearSelected,
        pokemons2: player2Pokemons,
        setPokemons2: setPlayer2Pokemons,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonsContext.Provider>
  );
};

export default GamePage;
