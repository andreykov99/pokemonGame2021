import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';


const MenuHeader = ({ bgActive }) => {
    const [isActive, setActive] = useState(null);
    const [isModalOpen, setModalOpen] = useState(null);
    const handleMenuButtonChange = () => {
        setActive(prevState => !prevState);
    }

    const handleClickLogin = () => {
        setModalOpen(prevState => !prevState);
    }

    return (
        <>
            <Navbar
                onMenuButtonChange={handleMenuButtonChange}
                onClickLogin={handleClickLogin}
                isActive={isActive}
                bgActive={bgActive}
            />
            <Menu
                isActive={isActive}
                closeMenu={handleMenuButtonChange}
            />
            <Modal
                isOpen={isModalOpen}
                title="This is title"
                onCloseModal={handleClickLogin}
            >
                Some text here...
            </Modal>
        </>
    )
}

export default MenuHeader;