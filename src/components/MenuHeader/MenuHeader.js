import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { userSignIn, userSignUp, selectIsLogin, userLogout } from '../../store/user';

import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';

const ACTIONS = {
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
    case ACTIONS.SHOW_MENU: {
      return {
        ...state,
        isActive: true
      };
    }
    case ACTIONS.HIDE_MENU: {
      return {
        ...state,
        isActive: false
      };
    }
    case ACTIONS.TOGGLE_MENU: {
      return {
        ...state,
        isActive: !state.isActive
      };
    }
    case ACTIONS.OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true
      };
    }
    case ACTIONS.CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false
      };
    }
    case ACTIONS.SHOW_LOGIN_FORM: {
      return {
        ...state,
        isLoginForm: true
      };
    }
    case ACTIONS.SHOW_REGISTER_FORM: {
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
    isActive: false,
    isModalOpen: false,
    isLoginForm: true
  };

  const [state, dispatch] = useReducer(headReducer, initialState);

  // const dispatch = useDispatch();
  // const userIsLogin = useSelector(selectIsLogin);
  const userIsLogin = useSelector(selectIsLogin);

  const handleMenuButtonChange = () => {
    dispatch({ type: ACTIONS.TOGGLE_MENU });
  };

  const handleClickLogin = () => {
    if (userIsLogin) {
      dispatch(userLogout());
    } else {
      dispatch({ type: ACTIONS.OPEN_MODAL });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: ACTIONS.CLOSE_MODAL });
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
            isModalOpen={state.isModalOpen}
            onChangeForm={() => dispatch({ type: ACTIONS.SHOW_REGISTER_FORM })}
          />
        ) : (
          <SignUpForm
            onSubmit={handleFormSubmit}
            isModalOpen={state.isModalOpen}
            onChangeForm={() => dispatch({ type: ACTIONS.SHOW_LOGIN_FORM })}
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
