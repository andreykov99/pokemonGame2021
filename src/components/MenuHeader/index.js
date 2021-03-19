import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';


const MenuHeader = ({ bgActive }) => {
    const [isActive, setActive] = useState(null);
    const handleMenuButtonChange = () => {
        setActive(prevState => !prevState);
    }

    return (
        <>
            <Navbar onMenuButtonChange={handleMenuButtonChange} isActive={isActive} bgActive={bgActive} />
            <Menu isActive={isActive} closeMenu={handleMenuButtonChange} />
        </>
    )
}

export default MenuHeader;