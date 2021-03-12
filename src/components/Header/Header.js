import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {
    return (
        <header className={styles.root}>
            <div className={styles.forest}></div>
            <div className={styles.container}>
                <h1>{props.title}</h1>
                <p>{props.desc}</p>
            </div>
        </header>
    )
}

export default Header;