import { useState, useEffect } from 'react';

import Input from "../Input"



const LoginForm = ({ onSubmit, onClose }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clearForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            email,
            password
        })
        clearForm();
    }

    useEffect(() => {
        if (!onClose) clearForm();
    }, [onClose])

    return (
        <form name="login" onSubmit={handleSubmit}>
            <Input
                name='email'
                label='E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type='password'
                name='password'
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>
                Login
            </button>
        </form>
    )
}

export default LoginForm;
