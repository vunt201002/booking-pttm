import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import { loginRoute } from "../utils/apiRoute";
import { UserContext } from '../context/UserContext';

axios.defaults.withCredentials = true;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                loginRoute,
                {
                    email,
                    password
                },
            );
            setUser(res.data);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-48'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet?
                        <Link to={'/register'} className='underline text-black'>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;