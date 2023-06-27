const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const api = require('./routes/api');
const passport = require('./config/passport/passport.config');
const session = require('./config/session/session.config');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "chrome-extension://deaefknmidhegpfhnaebhbkjacbjbfjk"
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const message = `Access to this server from ${origin} has been blocked by CORS policy`;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(morgan('combined'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use("/v1", api);

app.get("/", (req, res) => {
    res.json({
        message: `Current user is: ${req.user}`
    });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});
app.use(errorHandlerMiddleware);


module.exports = app;

