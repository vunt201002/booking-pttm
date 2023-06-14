const router = require("express").Router();
const placeController = require("../controllers/placeController");

// add new place
router.post("/new", placeController.addNewPlace);
// get all user places
router.get("/user-places", placeController.getAllUserPlaces);
// get place by id
router.get("/places/:id", placeController.getPlaceById);
// update place by id
router.put("/ud", placeController.updatePlaceById);
// get all places
router.get("/places", placeController.getAllPlaces);

module.exports = router;