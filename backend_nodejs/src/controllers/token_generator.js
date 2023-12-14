import jwt from 'jsonwebtoken';

function generateTokens(user) {
    try {
        const accessTokenPayload = {
            userId: user._id.toString(),
            userRole: user.role,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
        };
        const refreshTokenPayload = {
            userId: user._id.toString(),
            userRole: user.role,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
        };

        // Generate access token
        const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m' });

        // Generate refresh token
        const refreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        // Return tokens as an object
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error generating tokens:', error);
        throw new Error('Error generating tokens');
    }
}

export default generateTokens;
