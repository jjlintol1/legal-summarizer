const express = require('express');

const CustomError = require('../../errors');

const passport = require('../../config/passport/passport.config');

const authRouter = express.Router();

authRouter.post('/register', passport.authenticate('local-register', {
    // failureRedirect: '/register',
    // successRedirect: '/',
    session: true
}), (req, res) => {
    const newUser = req.user;
    res.json({
        success: true,
        user: {
            id: newUser._id,
            provider: newUser.provider,
            email: newUser.email,
            expiration: Date.now() + (24 * 60 * 60 * 1000)
        }
    });
});
authRouter.post('/login', passport.authenticate('local-login', {
    // failureRedirect: '/login',
    // successRedirect: '/',
    session: true
}), (req, res) => {
    const newUser = req.user;
    res.json({
        success: true,
        user: {
            id: newUser._id,
            provider: newUser.provider,
            email: newUser.email,
            expiration: Date.now() + (24 * 60 * 60 * 1000)
        }
    });
});

authRouter.get('/google/web', passport.authenticate('google-web', {
    scope: ['email']
}));

authRouter.get('/google/web/callback', passport.authenticate('google-web', {
    failureRedirect: 'http://localhost:3000/auth/sign-in',
    successRedirect: 'http://localhost:3000/summary',
    session: true
}), (req, res) => {
    console.log('Callback successful for web');
});

authRouter.get('/google/extension', passport.authenticate('google-extension', {
    scope: ['email']
}));

authRouter.get('/google/extension/callback', passport.authenticate('google-extension', {
    failureRedirect: 'chrome-extension://deaefknmidhegpfhnaebhbkjacbjbfjk/#/sign-in',
    successRedirect: 'chrome-extension://deaefknmidhegpfhnaebhbkjacbjbfjk/#/summary',
    session: true
}), (req, res) => {
    console.log('Callback successful for extension');
});

authRouter.get('/currentuser/google', (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new CustomError.UnauthenticatedError('No active user');
        }
        return res.json({
            success: true,
            user: {
                id: user._id,
                provider: user.provider,
                email: user.email,
                googleId: user.googleId || null,
                expiration: Date.now() + (24 * 60 * 60 * 1000)
            }
        });
    } catch (error) {
        next(error);
    }
})

authRouter.get('/logout', (req, res, next) => {
    try {
        req.logout();
        req.session = null;
        res.clearCookie('session');
        return res.json({
            message: "Logout successful"
        });
    } catch (error) {
        next(error);
    }
})

module.exports = authRouter;