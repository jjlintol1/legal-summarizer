const CustomError = require('../errors');

function checkLoggedIn(req, res, next) {
    console.log('Current user is: ', req.user);
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        throw new CustomError.UnauthenticatedError('You must log in to proceed to this route');
    }
    next();
}

module.exports = checkLoggedIn;