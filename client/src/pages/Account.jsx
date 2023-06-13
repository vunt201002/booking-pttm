import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from '../components/AccountNav';

import { UserContext } from "../context/UserContext";
import { logoutRoute, getUserInfoRoute } from '../utils/apiRoute';
import Places from './Places';

axios.defaults.withCredentials = true;

const Account = () => {
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }
    
    if (!user) {
        navigate('/login');
    }

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(getUserInfoRoute);
            setUser(data);
        }

        if (!user) {
            getUser();
        }
    }, []);

    const logout = async () => {
        await axios.post(logoutRoute);
        navigate("/");
        setUser(null);
    };

    return (
        <div>
            <AccountNav />
            {
                subpage === 'profile' && (
                    <div className='text-center max-w-lg mx-auto'>
                        Logged in as {user.name} ({user.email})
                        <button className='primary max-w-sm mt-2' onClick={logout}>Log out</button>
                    </div>
                )
            }
            {
                subpage === 'places' && <Places />
            }
        </div>
    )
};

export default Account;