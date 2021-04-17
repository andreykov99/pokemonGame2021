import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userSignIn, selectIsLogin, userLogout } from '../../store/user';

import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';

const MenuHeader = ({ bgActive }) => {
    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLogin);

    const [isActive, setActive] = useState(null);
    const [isModalOpen, setModalOpen] = useState(null);


    const handleMenuButtonChange = () => {
        setActive(prevState => !prevState);
    }

    const handleClickLogin = () => {
        if (isLogin) {
            dispatch(userLogout());
        } else {
            setModalOpen(true);
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleLoginFormSubmit = ({ email, password }) => {
        dispatch(userSignIn({ email, password }));
        handleCloseModal();
    }


    useEffect(() => {
        document.querySelector('body').style.overflow = isModalOpen ? 'hidden' : null;
    }, [isModalOpen])

    return (
        <>
            <Navbar
                onMenuButtonChange={handleMenuButtonChange}
                onClickLogin={handleClickLogin}
                isActive={isActive}
                bgActive={bgActive}
                isLogin={isLogin}
            />
            <Menu
                isActive={isActive}
                closeMenu={handleMenuButtonChange}
            />
            <Modal
                isOpen={isModalOpen}
                title="Please login to start game"
                onCloseModal={handleCloseModal}
            >
                <LoginForm
                    onSubmit={handleLoginFormSubmit}
                    onClose={isModalOpen}
                />
            </Modal>
        </>
    )
}

export default MenuHeader;