import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Input from '../Input';

import s from './style.module.css';

const SignUpForm = ({ onSubmit, isModalOpen, onChangeForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwconfirm, setPwconfirm] = useState('');
  const [errors, setErrors] = useState({});

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setPwconfirm('');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwconfirm !== password) {
      // show error
      setErrors((prev) => ({
        ...prev,
        pwconfirm: 'passwords may be some'
      }));
      return;
    }
    onSubmit({
      email,
      password
    });
    clearForm();
  };

  useEffect(() => {
    if (!isModalOpen) clearForm();
  }, [isModalOpen]);

  return (
    <form name="login" onSubmit={handleSubmit}>
      <Input name="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Input
        type="password"
        name="pwconfirm"
        label="Confirm password"
        value={pwconfirm}
        onChange={(e) => setPwconfirm(e.target.value)}
        error={errors.pwconfirm}
      />
      <div className={s.flex}>
        <button type="button">Sign Up</button>
        <div
          role="button"
          tabIndex={0}
          className={s.link}
          onClick={onChangeForm}
          onKeyPress={onChangeForm}
        >
          Login
        </div>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  isModalOpen: PropTypes.bool,
  onChangeForm: PropTypes.func
};
export default SignUpForm;
