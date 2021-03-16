import { useState } from 'react';
// import cn from 'classnames';
// import styles from './style.module.css'
import Navbar from '../Navbar';

import '../../App.css';
import Menu from '../Menu';

const MenuHeader = () => {
    const [isActive, setActive] = useState(false);
    const handleMenuButtonChange = () => {
        setActive(!isActive);
    }

    return (
        <>
            <Navbar onMenuButtonChange={handleMenuButtonChange} isActive={isActive} />
            <Menu isActive={isActive} />
        </>
    )
}

export default MenuHeader;