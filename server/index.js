const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const placeRoute = require("./routes/placeRoute");
const bookingRoute = require("./routes/bookingRoute");

const app = express();

dotenv.config();
app.use(cors({
    origin: ["https://airbnb-app-6tc5.onrender.com"],
    // origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://airbnb-app-6tc5.onrender.com');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
});

app.use("/v1/user", userRoute);
app.use("/v1/place", placeRoute);
app.use("/v1/booking", bookingRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
})