

const authenticate = (req, res, next) => {
    console.log('Session isAuthenticated:', req.session.isAuthenticated);
    if (req.session.isAuthenticated) {
        console.log('Authenticated');
        next();
    } else {
        console.log('Not authenticated');
        res.redirect('/');
    }
};

export default authenticate;