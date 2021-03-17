import { useState } from 'react';
import GamePage from './routes/Game';
import HomePage from './routes/Home';

import './App.css';

const App = () => {
  const [page, setPage] = useState('main');
  const handleChangePage = (page) => {
    setPage(page);
  }

  switch (page) {
    case 'main':
      return <HomePage onChangePage={handleChangePage} />
    case 'game':
      return <GamePage onChangePage={handleChangePage} />
    default:
      return <HomePage />
  }

}

export default App;