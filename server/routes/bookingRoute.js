const router = require("express").Router();
const bookingController = require("../controllers/bookingController");

// add new booking
router.post("/new", bookingController.newBooking);
// get all bookings
router.get('/bookings', bookingController.getAllBookings);
// get booking by id
router.get('/bookings/:id', bookingController.getBookingById);

module.exports = router;