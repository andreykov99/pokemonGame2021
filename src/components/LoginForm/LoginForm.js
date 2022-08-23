import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Input from '../Input';

import s from './style.module.css';

const LoginForm = ({ onSubmit, isModalOpen, onChangeForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isInvalid = password === '' || email === '';

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      email,
      password,
    });
    clearForm();
  };

  useEffect(() => {
    if (!isModalOpen) clearForm();
  }, [isModalOpen]);

  return (
    <form name="login" onSubmit={handleSubmit}>
      <Input
        name="email"
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={s.flex}>
        <button type="submit" disabled={isInvalid}>
          Login
        </button>
        <div
          className={s.link}
          onClick={onChangeForm}
          role="button"
          tabIndex={0}
          onKeyPress={onChangeForm}
        >
          Register
        </div>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  isModalOpen: PropTypes.bool,
  onChangeForm: PropTypes.func,
};

export default LoginForm;
