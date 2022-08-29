import { Outlet, useLocation } from 'react-router-dom';
import cn from 'classnames';
import Footer from '../Footer';
import MenuHeader from '../MenuHeader';
import styles from './style.module.css';

const AppLayout = () => {
  const location = useLocation();
  const isPadding =
    location.pathname === '/' || location.pathname === '/game/board';

  return (
    <>
      <MenuHeader bgActive={!isPadding} />
      <div className={cn(styles.wrap, { [styles.isHomePage]: isPadding })}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export { AppLayout };
