import express from 'express';

const logout = express();

logout.post('/logout', async (req, res) => {
    try {
        // Destroy the session
        await new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log('session destroyed');

        res.json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error destroying session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default logout;