import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import handleImage from "../controllers/handleImage.js";
import generateTokens from '../controllers/token_generator.js';
import multer from 'multer';

const sign_up = express();
const upload = multer();

sign_up.post('/sign_up', upload.single('image'), async (req, res) => {
    const { username, password, firstName, middleName, lastName, role, birthDate, telephone, country, city, bio } = req.body;
    const userEmail = `${username.toLowerCase()}@meroni.com`;
    try {
        if (req.file) {
            const userExists = await User.findOne({ email: userEmail });

            if (userExists) {
                res.json({ error: true, message: 'User already exists' });
                console.log('User Name already exists');
            }

            const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

            const imageBuffer = req.file.buffer;

            const imageUrl = await handleImage(imageBuffer);

            let lastPost;
            let lastId = 0;

            lastPost = await User.find().sort({ id: -1 }).limit(1).exec();
            if (lastPost && lastPost.length > 0) {
                lastId = lastPost[0].id;
            }
            const id = lastId + 1;


            // Save the rest of the data to the database
            const newUser = new User({
                id,
                email: userEmail,
                password: hash,
                firstName,
                middleName,
                lastName,
                username,
                imageUrl: imageUrl,
                role: role,
                birthDate,
                telephone,
                country,
                city,
                bio
            });

            try {
                await newUser.save();

                const { accessToken, refreshToken } = generateTokens(newUser);

                //Set session values
                req.session.isAuthenticated = true;
                req.session.userRole = newUser.role;
                req.session.userId = newUser._id.toString();

                await new Promise((resolve, reject) => {
                    req.session.save((err) => {
                        if (err) {
                            reject(err);
                            console.error('Error saving session:', err);
                        } else {
                            resolve();
                            console.log('Session saved successfully');
                        }
                    });
                });

                if (role === 'Reader') {
                    res.json({
                        success: true,
                        message: 'User created successfully',
                        sessionId: req.sessionID,
                        isAuthenticated: req.session.isAuthenticated,
                        userRole: req.session.userRole,
                        id: req.session.userId,
                        firstName: newUser.firstName,
                        middleName: newUser.middleName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        imageUrl: newUser.imageUrl,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });
                    console.log('User created successfully');
                } else if (role === 'Pending') {
                    res.json({
                        success: true,
                        message: 'Editor created successfully, please wait for approval',
                        isAuthenticated: req.session.isAuthenticated,
                        userRole: req.session.userRole,
                        id: req.session.userId,
                        firstName: req.session.firstName,
                        middleName: req.session.middleName,
                        lastName: req.session.lastName,
                        email: req.session.email,
                        imageUrl: req.session.imageUrl,
                        accessToken: req.session.accessToken,
                        refreshToken: req.session.refreshToken
                    });
                    console.log('Editor created successfully, please wait for approval');
                }
            } catch (saveError) {
                console.error('Error saving user to the database:', saveError);
                res.json({ error: true, message: 'Error saving user to the database' });
            }

        } else {
            // Handle the case where no image is provided
            res.json({ error: true, message: 'Image is required' });
        }
    } catch (error) {
        console.error('Error creating newUser:', error);
        res.status(500).json({ error: 'Error creating reader' });
    }
});

export default sign_up;