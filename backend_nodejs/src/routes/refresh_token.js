import express from 'express';
import jwt from 'jsonwebtoken';

const refresh_token = express();

refresh_token.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'Refresh token not provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Generate a new access token
        const newAccessToken = jwt.sign({
            userId: decoded.userId,
            userRole: decoded.userRole,
            firstName: decoded.firstName,
            middleName: decoded.middleName,
            lastName: decoded.lastName,
            email: decoded.email
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m' });

        res.json({ success: true, accessToken: newAccessToken });
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
});

export default refresh_token