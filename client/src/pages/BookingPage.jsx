import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getBookingByIdRoute } from "../utils/apiRoute";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDate from '../components/BookingDate';

axios.defaults.withCredentials = true;

const BookingPage = () => {
    const { id } = useParams();

    const [booking, setBooking] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getBooking = async () => {
            const res = await axios.get(`${getBookingByIdRoute}/${id}`);
            setBooking(res.data);
            setIsLoading(true);
        };

        if (id) {
            getBooking();
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <>
            {isLoading && (
                <div className='my-8 max-w-[1000px] mx-auto'>
                    <h1 className='text-3xl'>{booking.place.title}</h1>
                    <AddressLink place={booking.place} />
                    <div className='bg-gray-200 p-4 my-6 rounded-2xl flex justify-between items-center'>
                        <div>
                            <h2 className='text-2xl mb-4'>Your booking infomation</h2>
                            <BookingDate booking={booking} />
                        </div>
                        <div className='bg-primary p-6 text-white rounded-2xl'>
                            Total price
                            <div className='text-3xl'>
                                ${booking.price}
                            </div>
                        </div>
                    </div>
                    <PlaceGallery place={booking.place} />
                </div>
            )}
        </>   
    )
};

export default BookingPage;