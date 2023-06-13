const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const fs = require("fs");

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const salt = bcryptjs.genSaltSync(10);
            const hashPass = bcryptjs.hashSync(password, salt);

            const newUser = await User.create({
                name,
                email,
                password: hashPass
            });

            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user) {
                const comparePass = bcryptjs.compareSync(password, user.password);

                if (comparePass) {
                    jwt.sign(
                        {
                            email: user.email,
                            id: user._id
                        },
                        process.env.SECRET_KEY,
                        {},
                        (err, token) => {
                            if (err) throw err;
                            
                            return res.cookie('token', token, {
                                httpOnly: true,
                                sameSite: 'none',
                                path: "/",
                                secure: true
                            }).json(user);
                        }
                    );
                } else {
                    return res.status(403).json("Wrong password");
                }
            } else {
                return res.status(403).json("Wrong email");
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getInfoUser: async (req, res) => {
        try {
            const { token } = req.cookies;
            
            if (token) {
                jwt.verify(
                    token,
                    process.env.SECRET_KEY,
                    {},
                    async (err, user) => {
                        if (err) throw err;
                        const { name, email, _id } = await User.findById(user.id);
                        return res.status(200).json({ name, email, _id }); 
                    }
                );
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    logout: async (req, res) => {
        try {
            return res.cookie('token', '').json(true);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    uploadByLink: async (req, res) => {
        try {
            const { link } = req.body;
            const newName = 'photo' + Date.now() + '.jpg';
            const path = require("path");
            const rp = path.resolve("./uploads");
            const options = {
                url: link,
                dest: rp + "/" + newName,
            };

            await imageDownloader.image(options);

            return res.status(200).json(newName);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    uploadFromDevice: async (req, res) => {
        try {
            const uploadedFiles = [];

            for (let i = 0; i < req.files.length; i++) {
                const { path, originalname } = req.files[i];
                const parts = originalname.split('.');
                const ext = parts[parts.length - 1];
                const newPath = path + '.' + ext;
                fs.renameSync(path, newPath);
                uploadedFiles.push(newPath.replace('uploads\\', ''));
            }
            return res.json(uploadedFiles);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = userController;