const Place = require("../models/Places");
const jwt = require("jsonwebtoken");

const placeController = {
    addNewPlace: async (req, res) => {
        const { token } = req.cookies;
        const {
            title, address, addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        } = req.body;

        try {
            jwt.verify(
                token,
                process.env.SECRET_KEY,
                {},
                async (err, user) => {
                    if (err) throw err;
                    const placeDoc = await Place.create({
                        owner: user.id,
                        title,
                        address,
                        photos: addedPhotos,
                        description,
                        perks,
                        extraInfo,
                        checkIn,
                        checkOut,
                        maxGuests,
                        price
                    });

                    return res.status(200).json(placeDoc);
                }
            );
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllUserPlaces: async (req, res) => {
        try {
            const { token } = req.cookies;
            jwt.verify(
                token,
                process.env.SECRET_KEY,
                {},
                async (err, user) => {
                    const { id } = user;
                    const places = await Place.find({ owner: user.id });

                    return res.status(200).json(places);
                }
            );
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getPlaceById: async (req, res) => {
        try {
            const { id } = req.params;
            const place = await Place.findById(id);

            return res.status(200).json(place);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    updatePlaceById: async (req, res) => {
        try {
            const {token} = req.cookies;
            const {
                id, title, address, addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price,
            } = req.body;

            jwt.verify(
                token,
                process.env.SECRET_KEY,
                {},
                async (err, userData) => {
                    if (err) throw err;

                    const placeDoc = await Place.findById(id);

                    if (userData.id === placeDoc.owner.toString()) {
                        placeDoc.set({
                            title, address, photos:addedPhotos, description,
                            perks, extraInfo, checkIn, checkOut, maxGuests, price,
                        });

                    await placeDoc.save();
                    
                    return res.status(200).json(placeDoc);
                }
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllPlaces: async (req, res) => {
        try {
            const places = await Place.find();

            return res.status(200).json(places);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = placeController;