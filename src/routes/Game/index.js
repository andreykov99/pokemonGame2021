import React from 'react';
import cn from 'classnames';
import styles from './style.module.css'

import '../../App.css';

const GamePage = ({ onChangePage }) => {
    const handleClickButton = () => {
        onChangePage && onChangePage('main');
    }

    return (
        <div className={cn(styles.root, styles.flex)}>
            <h2>This is Game Page!</h2>
            <button className="btn" onClick={handleClickButton}>Home</button>
        </div>
    )
}
export default GamePage;