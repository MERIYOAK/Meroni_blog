import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { checkLoginAttempts, MAX_LOGIN_ATTEMPTS, TIME_FRAME_IN_MINUTES } from '../controllers/loginAttempts.js';
import generateTokens from '../controllers/token_generator.js';

const login = express();

login.post('/log_in', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userId = req.body.userId;
    const attempts = checkLoginAttempts(userId);

    if (attempts <= MAX_LOGIN_ATTEMPTS) {
        try {
            const user = await User.findOne({ email: email });

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {

                    const { accessToken, refreshToken } = generateTokens(user);

                    //Set session values
                    req.session.isAuthenticated = true;
                    req.session.userRole = user.role;
                    req.session.userId = user._id.toString();
                    req.session.firstName = user.firstName;
                    req.session.middleName = user.middleName;
                    req.session.lastName = user.lastName;
                    req.session.email = user.email;
                    req.session.imageUrl = user.imageUrl;
                    req.session.accessToken = accessToken;
                    req.session.refreshToken = refreshToken;

                    await new Promise((resolve, reject) => {
                        req.session.save((err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                    res.json({
                        success: true,
                        message: 'User logged in successfully',
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
                } else {
                    res.json({ error: true, message: 'Invalid password' });
                    console.log('Invalid password');
                }
            } else {
                res.json({ error: true, message: 'User not found' });
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            res.json({ error: true, message: 'Error logging in reader' });
        }
        return 'Login successful';
    } else {
        const waitTimeMinutes = TIME_FRAME_IN_MINUTES; // Adjust this as needed
        res.json({
            error: true,
            message: `Login attempts exceeded. Please try again after ${waitTimeMinutes} minutes.`,
            waitTimeMinutes: waitTimeMinutes,
        });
        return 'Login attempts exceeded. Please try again later.';
    }
});


export default login;