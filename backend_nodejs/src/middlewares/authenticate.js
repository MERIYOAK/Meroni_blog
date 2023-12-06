

const authenticate = (req, res, next) => {
    if (req.session.isAuthenticated) {
        console.log('Authenticated');
        next();
    } else {
        console.log('Not authenticated');
        res.redirect('/');
    }
};

export default authenticate;