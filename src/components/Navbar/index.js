import { ReactComponent as LoginSvg } from './assets/login.svg';
import { ReactComponent as LogoutSvg } from './assets/logout.svg';
import logo from './assets/logo.png';

import cn from 'classnames';
import s from './style.module.css'

const Navbar = ({ onMenuButtonChange, onClickLogin, bgActive, isActive }) => {

    const handleMenuButtonClick = () => {
        onMenuButtonChange && onMenuButtonChange();
    }

    const handleLoginClick = () => {
        onClickLogin && onClickLogin();
    }

    return (
        <nav className={cn(s.root, { [s.bgActive]: bgActive })}>
            <div className={s.navWrapper}>
                <div className={s.brand}>
                    <img src={logo} alt={"logo"} />
                </div>
                <div className={s.menuWrap}>
                    <div className={s.loginBtn} onClick={handleLoginClick}>
                        {
                            localStorage.getItem('idToken') ?
                                <LogoutSvg /> :
                                <LoginSvg />
                        }
                    </div>
                    <div
                        className={cn(s.menuButton, { [s.active]: isActive })}
                        onClick={handleMenuButtonClick}>
                        <span />
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;