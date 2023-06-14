export const host = "https://airbnb-app-api.onrender.com";
// export const host = 'http://localhost:9000'

export const registerRoute = `${host}/v1/user/register`;
export const loginRoute = `${host}/v1/user/login`;
export const getUserInfoRoute = `${host}/v1/user/profile`;
export const logoutRoute = `${host}/v1/user/logout`;
export const uploadByLinkRoute = `${host}/v1/user/uplink`;
export const uploadFromDeviceRoute = `${host}/v1/user/updevice`;

export const addNewPlaceRoute = `${host}/v1/place/new`;
export const getAllUserPlacesRoute = `${host}/v1/place/user-places`;
export const getPlaceRoute = `${host}/v1/place/places`;
export const updatePlaceById = `${host}/v1/place/ud`;
export const getAllPlacesRoute = `${host}/v1/place/places`;

export const newBookingRoute = `${host}/v1/booking/new`;
export const getAllBookingsRoute = `${host}/v1/booking/bookings`;
export const getBookingByIdRoute = `${host}/v1/booking/bookings`;