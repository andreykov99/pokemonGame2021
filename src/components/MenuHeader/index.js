import { useState } from 'react';
// import cn from 'classnames';
// import styles from './style.module.css'
import Navbar from '../Navbar';

import '../../App.css';
import Menu from '../Menu';

const MenuHeader = ({ bgActive }) => {
    const [isActive, setActive] = useState(null);
    const handleMenuButtonChange = () => {
        setActive(prevState => !prevState);
    }

    return (
        <>
            <Navbar onMenuButtonChange={handleMenuButtonChange} isActive={isActive} bgActive={bgActive} />
            <Menu isActive={isActive} />
        </>
    )
}

export default MenuHeader;