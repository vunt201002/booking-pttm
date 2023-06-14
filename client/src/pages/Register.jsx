import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import { registerRoute } from "../utils/apiRoute";

axios.defaults.withCredentials = true;

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        
        await axios.post(registerRoute, {
            name,
            email,
            password
        });
        
        navigate("/login");
    };

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-48'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder='John Doe'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
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
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already have an account?
                        <Link to={'/login'} className='underline text-black'>Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Register;