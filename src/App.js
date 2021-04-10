import { useLocation, Route, Switch, Redirect } from 'react-router-dom';

import GamePage from './routes/Game';
import HomePage from './routes/Home';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import NotFound from './routes/NotFound';

import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Firebase from './services/firebase';
import FirebaseContext from './context/FirebaseContext';
import PrivateRoute from './components/PrivateRoute';

import cn from 'classnames';
import styles from './style.module.css';



const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';

  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(styles.wrap, { [styles.isHomePage]: isPadding })}>
              <Switch>
                <Route path="/" exact render={() => (<HomePage />)} />
                <Route path="/home" render={() => (
                  <Redirect to="/" />
                )} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (
                  <Redirect to="/404" />
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch >
      <NotificationContainer />
    </FirebaseContext.Provider>
  )
}

export default App;