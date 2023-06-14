import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

import { getPlaceRoute } from "../utils/apiRoute";
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

axios.defaults.withCredentials = true;

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState({});

    useEffect(() => {
        const getPlace = async () => {
            const res = await axios.get(`${getPlaceRoute}/${id}`);
            setPlace(res.data);
        };
        
        if (id) {
            getPlace();
        }
    }, [id]);

    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <AddressLink place={place}/>
            <PlaceGallery place={place}/>
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 mb-8 gap-8'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    Check in: {place.checkIn} <br />
                    Check out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div className='mt-4'>
                    <h2 className='font-semibold text-2xl'>Extra info</h2>
                </div>
                <div className='text-sm text-gray-700 leading-8 my-2'>
                    {place.extraInfo}
                </div>
            </div>
        </div>
    )
};

export default PlacePage;