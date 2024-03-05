import express from 'express';
import { mongoStore } from "../../index.js";

const logout = express();

logout.post('/logout', async (req, res) => {
    try {
        const sessionId = req.headers.sessionid;
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                throw new Error('Error logging out user');
            }

            // Remove the session from the MongoDB store
            mongoStore.destroy(sessionId, (destroyError) => {
                if (destroyError) {
                    console.error('Error destroying session in MongoDB:', destroyError);
                    throw new Error('Error logging out user');
                }

                res.json({ success: true, message: 'User logged out successfully' });
                console.log('User logged out successfully');
            });
        });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging out user',
        });
    }
});

export default logout;