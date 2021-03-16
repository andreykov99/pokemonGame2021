import React from 'react';
// import cn from 'classnames';
import styles from './Header.module.css';

import '../../App.css';

const Header = ({ title, desc, onClickButton }) => {
    const handleClickButton = () => {
        onClickButton && onClickButton('game');
    }
    return (
        <header className={styles.root}>
            <div className={styles.forest}></div>
            <div className={styles.container}>
                <h1>{title}</h1>
                <p>{desc}</p>
                <button className={styles.btn} onClick={handleClickButton}>Start Game</button>
            </div>
        </header>
    )
}

export default Header;