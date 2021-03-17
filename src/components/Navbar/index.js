import cn from 'classnames';
import styles from './style.module.css'

import '../../App.css';

const Navbar = ({ onMenuButtonChange, isActive }) => {
    const handleMenuButtonClick = () => {
        onMenuButtonChange && onMenuButtonChange();
    }
    return (
        <nav className={styles.root}>
            <div className={styles.navWrapper}>
                <p className={styles.brand}>
                    LOGO
                </p>
                <div
                    className={cn(styles.menuButton, { [styles.active]: isActive })}
                    onClick={handleMenuButtonClick}>
                    <span />
                </div>
            </div>
        </nav >
    )
}

export default Navbar;