import React from 'react';
import styles from './Header.module.css';

const Header = ({ title, desc }) => {
    return (
        <header className={styles.root}>
            <div className={styles.forest}></div>
            <div className={styles.container}>
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
        </header>
    )
}

export default Header;