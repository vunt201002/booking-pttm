import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import { getAllUserPlacesRoute } from "../utils/apiRoute";

axios.defaults.withCredentials = true;

const Places = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const getAllPlaces = async () => {
            const res = await axios.get(getAllUserPlacesRoute);
            setPlaces(res.data);
        };
        getAllPlaces();
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link 
                    to={'/account/places/new'}
                    className='bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className='mt-4 max-w-[800px] mx-auto'>
                {places.length > 0 && places.map((place, index) => (
                    <Link to={`/account/places/${place._id}`} key={index} className='flex gap-4 bg-gray-100 my-16 rounded-2xl cursor-pointer overflow-hidden'>
                        <div className='h-48 w-52'>
                            {place.photos.length > 0 && (
                                <PlaceImg place={place} />
                            )}
                        </div>
                        <div className='grow shrink py-2 pr-3'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default Places;