// Import necessary dependencies
import axios from 'axios';

const handleTokenRefresh = async (setAccessToken, refreshToken) => {
    try {
        const refreshResponse = await axios.post('http://localhost:3000/refresh-token', {
            refreshToken: refreshToken,
        }, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        setAccessToken(newAccessToken);
        console.log('Token refreshed successfully!');
    } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        console.log('Token refresh failed!');
    }
};

export default handleTokenRefresh;
