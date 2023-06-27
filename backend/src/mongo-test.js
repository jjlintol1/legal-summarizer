const express = require('express');
const { mongoConnect } = require('./config/mongo/mongo.config');
const User = require('./models/user.model');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    const user = await User.findOne({});
    res.json(user);
})

async function start() {
    await mongoConnect();
    app.listen(8000, () => {
        console.log('Listening on port 5000')
    })
}

start();