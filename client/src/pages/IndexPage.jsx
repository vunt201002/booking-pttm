import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import { getAllPlacesRoute, host } from "../utils/apiRoute";

axios.defaults.withCredentials = true;

const IndexPage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const getAllPlaces = async () => {
            const res = await axios.get(getAllPlacesRoute);
            setPlaces(res.data);
        };
        getAllPlaces();
    }, []);

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8'>
            {places.length > 0 && places.map((place, index) => (
                <Link to={'/place/' + place._id} key={index}>
                    <div className='bg-gray-500 rounded-2xl flex mb-2'>
                        {place.photos?.[0] && (
                            <img className='rounded-2xl object-cover aspect-square' src={`${host}/uploads/${place.photos[0]}`} alt="/" />
                        )}
                    </div>
                    <h3 className='font-bold leading-4 '>{place.address}</h3>
                    <h2 className="text-sm mt-1 leading-4 text-gray-500">{place.title}</h2>
                    <div className='mt-1'>
                        <span className='font-bold'>${place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
};

export default IndexPage;