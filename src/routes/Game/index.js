import React from 'react';
import cn from 'classnames';
import styles from './style.module.css'
import MenuHeader from '../../components/MenuHeader';

import '../../App.css';

const GamePage = ({ onChangePage }) => {
    const handleClickButton = () => {
        onChangePage && onChangePage('main');
    }

    return (
        <>
            <MenuHeader />
            <div className={cn(styles.root, styles.flex)}>
                <h2>This is Game Page!</h2>
                <button onClick={handleClickButton}>Home</button>
            </div>
        </>
    )
}
export default GamePage;