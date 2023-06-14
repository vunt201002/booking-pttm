import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { newBookingRoute } from "../utils/apiRoute";
import { UserContext } from "../context/UserContext";

axios.defaults.withCredentials = true;

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    let numberOfDays = 0;

    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const bookThisPlace = async () => {
        const totalPrice = numberOfDays * place.price;
        const placeId = place._id;

        const placeData = {
            place: placeId, checkIn, checkOut, numberOfGuests,
            name, phone, price: totalPrice 
        };

        const res = await axios.post(newBookingRoute, placeData);
        const bookingId = res.data._id;
        navigate(`/account/bookings/${bookingId}`);
    }

    return (
        <>
            <div className='bg-white shadow rounded-2xl p-4'>
                <div className='text-2xl text-center'>
                    Price: {place.price} / per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className='p-4'>
                            <label>Check in</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={e => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div className='p-4 border-l'>
                            <label>Check out</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={e => setCheckOut(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='p-4 border-t'>
                        <label>Number of guests</label>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={e => setNumberOfGuests(e.target.value)}
                            placeholder='1 guest'
                        />
                    </div>
                    {numberOfDays > 0 && (
                        <div className='p-4 border-t'>
                            <label>Your full name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='John Doe'
                            />
                            <label>Your phone number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder='123456789'
                            />
                        </div>
                    )}
                </div>
                <button className='primary mt-4' onClick={bookThisPlace}>
                    Book this place
                    {numberOfDays > 0 && (
                        <span className='ml-[2px]'>
                            ${numberOfDays * place.price}
                        </span>
                    )}
                </button>
            </div>
        </>
    )
};

export default BookingWidget;