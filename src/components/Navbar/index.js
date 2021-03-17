import cn from 'classnames';
import styles from './style.module.css'

const Navbar = ({ onMenuButtonChange, bgActive = false, isActive }) => {
    const handleMenuButtonClick = () => {
        onMenuButtonChange && onMenuButtonChange();
    }
    return (
        <nav className={cn(styles.root, { [styles.bgActive]: bgActive })}>
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