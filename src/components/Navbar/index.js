import { ReactComponent as LoginSvg } from './assets/login.svg';
import { ReactComponent as LogoutSvg } from './assets/logout.svg';
import logo from './assets/logo.png';

import cn from 'classnames';
import s from './style.module.css'

const Navbar = ({ onMenuButtonChange, onClickLogin, bgActive, isActive, isLogin }) => {

    const handleClickMenuButton = () => {
        onMenuButtonChange && onMenuButtonChange();
    }

    const handleClickLogin = () => {
        onClickLogin && onClickLogin();
    }

    return (
        <nav className={cn(s.root, { [s.bgActive]: bgActive })}>
            <div className={s.navWrapper}>
                <div className={s.brand}>
                    <img src={logo} alt={"logo"} />
                </div>
                <div className={s.menuWrap}>
                    <div className={s.loginBtn} onClick={handleClickLogin}>
                        {
                            isLogin ?
                                <LogoutSvg /> :
                                <LoginSvg />
                        }
                    </div>
                    <div
                        className={cn(s.menuButton, { [s.active]: isActive })}
                        onClick={handleClickMenuButton}>
                        <span />
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;