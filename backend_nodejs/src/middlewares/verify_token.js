import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    try {
        let accessToken = req.headers.authorization;

        if (!accessToken) {
            console.log('No accessToken provided');
            return res.status(401).send('Unauthorized: No accessToken provided');
        }

        if (accessToken.startsWith('Bearer ')) {
            accessToken = accessToken.slice(7, accessToken.length);
        } else {
            console.log('Invalid token format');
            return res.status(401).send('Unauthorized: Invalid token format');
        }

        // Check if the token is expired without attempting to verify it
        const decodedWithoutVerification = jwt.decode(accessToken);

        if (decodedWithoutVerification && decodedWithoutVerification.exp * 1000 < Date.now()) {
            console.log('Access token has expired');
            return res.status(401).send('Access token has expired');
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            req.user = decoded;
            console.log('User verified successfully with accessToken:', decoded);
            next();
        } catch (error) {
            console.error('Error verifying accessToken:', error);
            return res.status(401).send('Unauthorized: Invalid accessToken');
        }
    } catch (error) {
        console.error('Error getting accessToken:', error);
        return res.status(500).send('Internal server error: Failed to get accessToken');
    }
}

export default verifyToken;
