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
        phone: {
            type: String,
            required: true
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);