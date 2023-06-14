import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import { addNewPlaceRoute, getPlaceRoute, updatePlaceById } from "../utils/apiRoute";
import AccountNav from '../components/AccountNav';

axios.defaults.withCredentials = true;

const AddNewPlace = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDesciption] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);

    const inputHeader = text => {
        return (
            <h2 className='text-2xl mt-4 '>{text}</h2>
        );
    };

    const inputDesc = text => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        );
    };

    const preInput = (header, desc) => {
        return (
            <>
                {inputHeader(header)}
                {inputDesc(desc)}
            </>
        );
    };

    const savePlace = async (e) => {
        e.preventDefault();

        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        };

        if (id) {
            // update existing place
            await axios.put(updatePlaceById, {
                id,
                ...placeData
            });
            navigate("/account/places");
        } else {
            // add new place
            await axios.post(addNewPlaceRoute, placeData);
            navigate("/account/places");
        }
    };

    useEffect(() => {
        const getPlace = async () => {
            const { data } = await axios.get(`${getPlaceRoute}/${id}`);
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDesciption(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        };
        if (id) {
            getPlace();
        }
    }, [id]);

    return (
        <>
            <AccountNav />
            <div>
                <form onSubmit={savePlace}>
                    {preInput('Title', 'title for your place, should be short and catchy as in advertisement')}
                    <input
                        type="text"
                        placeholder='title, for example: My love apt'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {preInput('Address', 'address to this place')}
                    <input
                        type="text"
                        placeholder='address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    {preInput('Photos', 'more = better')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    {preInput('Description', 'desc of place')}
                    <textarea value={description} onChange={e => setDesciption(e.target.value)}/>
                    {preInput('Perks', 'select all the perks of your place')}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2'>
                        <Perks selected={perks} onchange={setPerks}/>
                    </div>
                    {preInput('Extra info', 'house rules, etc')}
                    <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}/>
                    {preInput('Check in&out times', 'add check in and out times,remember have some time window for cleaning the room between guests')}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                        <div>
                            <h3 className='mt-2 -mb-1 '>Check in times</h3>
                            <input
                                type="text"
                                placeholder='14:00 AM'
                                value={checkIn}
                                onChange={e => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1 '>Check out times</h3>
                            <input
                                type="text"
                                value={checkOut}
                                placeholder='11'
                                onChange={e => setCheckOut(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1 '>Max number of guests</h3>
                            <input
                                type="number"
                                value={maxGuests}
                                onChange={e => setMaxGuests(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1 '>Price per night</h3>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className='primary my-4'>Save</button>
                </form>
            </div>
        </>
    )
};

export default AddNewPlace;