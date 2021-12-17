import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style.module.css';
import { ReactComponent as LoginSvg } from './assets/login.svg';
import { ReactComponent as LogoutSvg } from './assets/logout.svg';
import logo from './assets/logo.png';

const Navbar = ({ onMenuButtonChange, onClickLogin, bgActive, isActive, isLogin }) => {
  const handleClickMenuButton = () => {
    onMenuButtonChange();
  };

  const handleClickLogin = () => {
    onClickLogin();
  };

  return (
    <nav className={cn(s.root, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <div className={s.brand}>
          <img src={logo} alt="logo" />
        </div>
        <div className={s.menuWrap}>
          <div
            role="button"
            className={s.loginBtn}
            onClick={handleClickLogin}
            tabIndex={0}
            onKeyPress={handleClickLogin}
          >
            {isLogin ? <LogoutSvg /> : <LoginSvg />}
          </div>
          <div
            role="button"
            tabIndex={0}
            className={cn(s.menuButton, { [s.active]: isActive })}
            onClick={handleClickMenuButton}
            onKeyPress={handleClickMenuButton}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onMenuButtonChange: PropTypes.func,
  onClickLogin: PropTypes.func,
  bgActive: PropTypes.bool,
  isActive: PropTypes.bool,
  isLogin: PropTypes.bool
};
export default Navbar;
