import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import { register, login, logout } from '../../features/auth/authSlice';
import {
  toggleMenu,
  openModal,
  closeModal,
  showLogin,
  showRegister,
} from '../../features/header/headerSlice';

const MenuHeader = ({ bgActive }) => {
  const dispatch = useDispatch();
  const { isActive, isModalOpen, isLoginForm } = useSelector(
    (state) => state.header
  );
  const { user } = useSelector((state) => state.auth);
  const userIsLogin = !!user;

  const handleMenuButtonChange = () => {
    dispatch(toggleMenu());
  };

  const handleClickLogin = () => {
    if (userIsLogin) {
      dispatch(logout());
    } else {
      dispatch(openModal());
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleFormSubmit = ({ email, password }) => {
    if (isLoginForm) {
      dispatch(login({ email, password }));
      handleCloseModal();
      return;
    }
    dispatch(register({ email, password }));
    handleCloseModal();
  };

  useEffect(() => {
    document.querySelector('body').style.overflow = isModalOpen
      ? 'hidden'
      : null;
  }, [isModalOpen]);

  return (
    <>
      <Navbar
        onMenuButtonChange={handleMenuButtonChange}
        onClickLogin={handleClickLogin}
        isActive={isActive}
        bgActive={bgActive}
        isLogin={userIsLogin}
      />
      <Menu isActive={isActive} closeMenu={handleMenuButtonChange} />
      <Modal
        isOpen={isModalOpen}
        title="Please login to start game"
        onCloseModal={handleCloseModal}
      >
        {isLoginForm ? (
          <LoginForm
            onSubmit={handleFormSubmit}
            isModalOpen={isModalOpen}
            onChangeForm={() => dispatch(showRegister())}
          />
        ) : (
          <SignUpForm
            onSubmit={handleFormSubmit}
            isModalOpen={isModalOpen}
            onChangeForm={() => dispatch(showLogin())}
          />
        )}
      </Modal>
    </>
  );
};

MenuHeader.propTypes = {
  bgActive: PropTypes.bool,
};

export default MenuHeader;
