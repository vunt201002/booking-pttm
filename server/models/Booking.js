const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const bookingSchema = new moongoose.Schema(
    {
        place: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Place'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    }
);

module.exports = mongoose.model("Booking", bookingSchema);