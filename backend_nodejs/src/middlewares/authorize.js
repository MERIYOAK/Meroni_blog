
const authorize = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.session.userRole)) {
            console.log('Authorized');
            next();
        } else {
            console.log('Not authorized');
            res.redirect('/');
        }
    };
};

export default authorize