import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [id, setid] = useState('');
    const [password, setPassword] = useState('');
    // const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await login(id, password);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="id"
                value={id}
                onChange={(e) => setid(e.target.value)}
                placeholder="id"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;