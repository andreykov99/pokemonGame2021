import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { userSignIn, userSignUp, selectIsLogin, userLogout } from '../../store/user';

import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';

const actionTypes = {
  SHOW_MENU: 'SHOW_MENU',
  HIDE_MENU: 'HIDE_MENU',
  TOGGLE_MENU: 'TOGGLE_MENU',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SHOW_LOGIN_FORM: 'SHOW_LOGIN_FORM',
  SHOW_REGISTER_FORM: 'SHOW_REGISTER_FORM'
};

function headReducer(state, action) {
  const { type } = action;
  switch (type) {
    case actionTypes.SHOW_MENU: {
      return {
        ...state,
        isActive: true
      };
    }
    case actionTypes.HIDE_MENU: {
      return {
        ...state,
        isActive: false
      };
    }
    case actionTypes.TOGGLE_MENU: {
      return {
        ...state,
        isActive: !state.isActive
      };
    }
    case actionTypes.OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true
      };
    }
    case actionTypes.CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false
      };
    }
    case actionTypes.SHOW_LOGIN_FORM: {
      return {
        ...state,
        isLoginForm: true
      };
    }
    case actionTypes.SHOW_REGISTER_FORM: {
      return {
        ...state,
        isLoginForm: false
      };
    }
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}

const MenuHeader = ({ bgActive }) => {
  const initialState = {
    isActive: null,
    isModalOpen: null,
    isLoginForm: true
  };

  const [state, dispatch] = useReducer(headReducer, initialState);

  // const dispatch = useDispatch();
  // const userIsLogin = useSelector(selectIsLogin);
  const userIsLogin = useSelector(selectIsLogin);

  const handleMenuButtonChange = () => {
    dispatch({ type: actionTypes.TOGGLE_MENU });
  };

  const handleClickLogin = () => {
    if (userIsLogin) {
      dispatch(userLogout());
    } else {
      dispatch({ type: actionTypes.OPEN_MODAL });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: actionTypes.CLOSE_MODAL });
  };

  const handleFormSubmit = ({ email, password }) => {
    if (state.isLoginForm) {
      dispatch(userSignIn({ email, password }));
      handleCloseModal();
      return;
    }
    dispatch(userSignUp({ email, password }));
    handleCloseModal();
  };

  useEffect(() => {
    document.querySelector('body').style.overflow = state.isModalOpen ? 'hidden' : null;
  }, [state.isModalOpen]);

  return (
    <>
      <Navbar
        onMenuButtonChange={handleMenuButtonChange}
        onClickLogin={handleClickLogin}
        isActive={state.isActive}
        bgActive={bgActive}
        isLogin={userIsLogin}
      />
      <Menu isActive={state.isActive} closeMenu={handleMenuButtonChange} />
      <Modal
        isOpen={state.isModalOpen}
        title="Please login to start game"
        onCloseModal={handleCloseModal}
      >
        {state.isLoginForm ? (
          <LoginForm
            onSubmit={handleFormSubmit}
            onClose={state.isModalOpen}
            onChangeForm={() => dispatch({ type: actionTypes.SHOW_REGISTER_FORM })}
          />
        ) : (
          <SignUpForm
            onSubmit={handleFormSubmit}
            onClose={state.isModalOpen}
            onChangeForm={() => dispatch({ type: actionTypes.SHOW_LOGIN_FORM })}
          />
        )}
      </Modal>
    </>
  );
};

MenuHeader.propTypes = {
  bgActive: PropTypes.bool
};

export default MenuHeader;
