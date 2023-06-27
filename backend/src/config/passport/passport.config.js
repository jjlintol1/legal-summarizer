const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const CustomError = require('../../errors');

const User = require('../../models/user.model');

require('dotenv').config();

const LOCAL_OPTIONS = {
    usernameField: 'email',
    passwordField: 'password'
}

const OAUTH_OPTIONS_WEB = {
    callbackURL: "/v1/auth/google/web/callback",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}

const OAUTH_OPTIONS_EXTENSION = {
    callbackURL: "/v1/auth/google/extension/callback",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}


async function registerUserCallback(email, password, done) {
    try {
        console.log(email, password);
        if (!email || !password) {
            throw new CustomError.BadRequestError('Missing email or password');
        }
        const user = await User.findOne({ email: email });
        if (user) {
            throw new CustomError.BadRequestError('Email already in use');
        }
        if (password.length < 8) {
            throw new CustomError.BadRequestError('Password must be at least 8 characters');
        }
        const newUser = await User.create({
            email: email,
            password: password,
            provider: 'local'
        });
        done(null, newUser);
    } catch (error) {
        done(error);
    }
}

async function loginUserCallback(email, password, done) {
    try {
        if (!email || !password) {
            throw new CustomError.BadRequestError('Missing email or password');
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError.UnauthenticatedError('User not found');
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new CustomError.UnauthenticatedError('The password is incorrect');
        }
        done(null, user);      
    } catch (error) {
        done(error);
    }
}

async function oauthCallback(accessToken, refreshToken, profile, done) {
    try {
        console.log('Google profile', profile);
        const profileObject = profile._json;
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        }
        const newUser = await User.create({
            provider: 'google',
            googleId: profile.id,
            email: profileObject.email
        });
        return done(null, newUser);
    } catch (error) {
        done(error);
    }
}


passport.use('local-register', new LocalStrategy(LOCAL_OPTIONS, registerUserCallback));
passport.use('local-login', new LocalStrategy(LOCAL_OPTIONS, loginUserCallback));

passport.use('google-web' ,new GoogleStrategy(OAUTH_OPTIONS_WEB, oauthCallback));
passport.use('google-extension', new GoogleStrategy(OAUTH_OPTIONS_EXTENSION, oauthCallback));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
})

module.exports = passport;