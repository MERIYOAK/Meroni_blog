// loginAttempts.js

const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 3;
const TIME_FRAME_IN_MINUTES = 1;

function checkLoginAttempts(userId) {
    if (!loginAttempts.has(userId)) {
        loginAttempts.set(userId, { count: 1, lastAttempt: new Date() });
    } else {
        const userAttempts = loginAttempts.get(userId);
        const currentTime = new Date();

        // Check if the time frame has elapsed
        if ((currentTime - userAttempts.lastAttempt) / (1000 * 60) > TIME_FRAME_IN_MINUTES) {
            // Reset attempts if the time frame has passed
            userAttempts.count = 1;
        } else {
            // Increment attempts if within the time frame
            userAttempts.count += 1;
        }

        userAttempts.lastAttempt = currentTime;
    }

    return loginAttempts.get(userId).count;
}

export { checkLoginAttempts, loginAttempts, MAX_LOGIN_ATTEMPTS, TIME_FRAME_IN_MINUTES };

