import cn from 'classnames';
import styles from './style.module.css'

const MENU = [
    {
        title: 'HOME',
        to: 'welcome'
    },
    {
        title: 'GAME',
        to: 'game'
    },
    {
        title: 'ABOUT',
        to: 'about'
    },
    {
        title: 'CONTACT',
        to: 'contact'
    },
];

const Menu = ({ isActive }) => {
    return (
        <div className={cn(styles.menuContainer,
            { [styles.active]: isActive === true },
            { [styles.deactive]: isActive === false })}>
            <div className={styles.overlay} />
            <div className={styles.menuItems}>
                <ul>
                    {MENU.map(({ title, to }, index) => (
                        <li key={index}>
                            <a href={`#${to}`}>
                                {title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Menu;