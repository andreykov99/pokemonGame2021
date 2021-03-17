import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
// import { useState } from 'react';
import GamePage from './routes/Game';
import HomePage from './routes/Home';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';

import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import NotFound from './routes/NotFound';
import './App.css';

const App = () => {
  const match = useRouteMatch('/');
  return (
    <Switch>
      <Route path="/404" component={NotFound} />
      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" render={() => (
              <Redirect to="/" />
            )} />
            <Route path="/game" component={GamePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route render={() => (
              <Redirect to="/404" />
            )} />
          </Switch>
          <Footer />
        </>
      </Route>
    </Switch>
  )
}

export default App;