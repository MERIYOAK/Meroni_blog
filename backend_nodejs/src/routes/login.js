import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { checkLoginAttempts, MAX_LOGIN_ATTEMPTS, TIME_FRAME_IN_MINUTES } from '../controllers/loginAttempts.js';
import generateTokens from '../controllers/token_generator.js';
import { generatePresignedUrls } from '../controllers/imageUrlGenerator.js';

const login = express();

login.post('/log_in', async (req, res) => {
    const emailOrUsername = req.body.emailOrUsername;
    const password = req.body.password;
    const userId = req.body.userId;
    const attempts = checkLoginAttempts(userId);

    if (attempts <= MAX_LOGIN_ATTEMPTS) {
        try {
            const user = await User.findOne(
                { $or: [{ email: emailOrUsername }, { username: emailOrUsername }] }
            );

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {

                    const preSignedUrls = await generatePresignedUrls(await User.find());
                    const imageUrl = (preSignedUrls.find(url => url.userId.toString() === user._id.toString()))?.imageUrl || null;

                    const { accessToken, refreshToken } = generateTokens(user);

                    //Set session values
                    req.session.isAuthenticated = true;
                    req.session.userRole = user.role;
                    req.session.userId = user._id.toString();

                    // Save the session
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
                        sessionId: req.sessionID,
                        isAuthenticated: req.session.isAuthenticated,
                        userRole: req.session.userRole,
                        id: req.session.userId,
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        imageUrl: imageUrl,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });

                    console.log('User logged in successfully');
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