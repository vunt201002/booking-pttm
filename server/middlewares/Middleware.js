const multer = require('multer');
const jwt = require("jsonwebtoken");

const photoMiddleware = multer({
    dest: 'uploads/'
});

module.exports = {
    photoMiddleware,
};