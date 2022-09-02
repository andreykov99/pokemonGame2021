import { Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { PrivateRoute } from './components/PrivateRoute';
import { GamePage } from './routes/Game';
import { HomePage } from './routes/Home';
import { AboutPage } from './routes/About';
import { ContactPage } from './routes/Contact';
import { NotFoundPage } from './routes/NotFound';
import { StartPage } from './routes/Start';
import { BoardPage } from './routes/Board';
import { FinishPage } from './routes/Finish';
import { AppLayout } from './components/AppLayout/AppLayout';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="game" element={<GamePage />}>
          <Route index element={<StartPage />} />
          <Route path="start" element={<StartPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="finish" element={<FinishPage />} />
        </Route>
      </Route>
    </Routes>
    <NotificationContainer />
  </>
);

export default App;
