const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./config/mongo/mongo.config');

const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    })
}

startServer();