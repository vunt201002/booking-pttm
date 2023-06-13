const userController = require("../controllers/userController");
const router = require("express").Router();
const { photoMiddleware } = require("../middlewares/Middleware");

// register
router.post("/register", userController.register);
// login
router.post("/login", userController.login);
// get user info
router.get("/profile", userController.getInfoUser);
// logout
router.post("/logout", userController.logout);
// upload by link
router.post("/uplink", userController.uploadByLink);
// upload image from device
router.post('/updevice', photoMiddleware.array('photos', 100), userController.uploadFromDevice);

module.exports = router;