const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            req.cookies.token,
            process.env.SECRET_KEY,
            {},
            async (err, userData) => {
                if (err) throw err;
                resolve(userData);
            }
        );
    });
}

const bookingController = {
    newBooking: async (req, res) => {
        try {
            const userDoc = await getUserDataFromReq(req);
            const {
                place, checkIn, checkOut, numberOfGuests,
                name, phone, price
            } = req.body;

            const bookingDoc = await Booking.create({
                place,
                user: userDoc.id,
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                price
            });

            return res.status(200).json(bookingDoc);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllBookings: async (req, res) => {
        try {
            const userDoc = await getUserDataFromReq(req);
            const bookings = await Booking.find({ user: userDoc.id }).populate('place');

            return res.status(200).json(bookings);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getBookingById: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await Booking.findById(id).populate('place');

            return res.status(200).json(booking);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = bookingController;