import React from 'react';

import { host } from '../utils/apiRoute';

const PlaceImg = ({ place, index = 0, className = null }) => {
    if (place.photos?.length <= 0) {
        return '';
    }

    if (!className) {
        className = 'object-cover';
    }

    return (
        <img className={'object-cover w-full h-full'} src={`${host}/uploads/${place.photos[index]}`} alt="img" />
    )
};

export default PlaceImg;