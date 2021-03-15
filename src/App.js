import { useState } from 'react';
import GamePage from './routes/Game';
import HomePage from './routes/Home';

const App = () => {
  const [page, setPage] = useState('main');

  switch (page) {
    case 'main':
      return <HomePage />
    case 'game':
      return <GamePage />
    default:
      return <HomePage />
  }

}

export default App;