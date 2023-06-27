const cookieSession = require('cookie-session');

require('dotenv').config();

const session = cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [ process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2 ]
});

module.exports = session;