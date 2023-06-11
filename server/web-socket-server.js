const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
const setTelegramWebhook = require('./telegram_bot');
const setupWebSocket = require('./websocket');
const { users } = require('./websocket');

const app = express();
setupWebSocket();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(bodyParser.json());
setTelegramWebhook(app, emitter);

/**
 * setup connection to DB
 */

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/login', (req, res) => {
 const { id } = req.query;
 if (!id) {
  return res.status(400).send({
   message: 'parameter id is required'
  });
 }
 const eventName = `login-${id}`;
 console.log(`Wait on login id:${id}`);
 emitter.once(eventName, (userInfo) => {
  res.status(200).send(userInfo);
 });
});

app.get('/users', (req, res) => {
    const { status } = req.query;

    if (status) {
        if (status === 'online') {
            const filtered = Object.keys(users).filter(key => users[key] === true);
            res.status(200).send(filtered);
        }
        if (status === 'offline') {
            const filtered = Object.keys(users).filter(key => users[key] === false);
            res.status(200).send(filtered);
        }
        res.status(400).send({ message: 'Query parameter is incorrect!' });
    }

    res.status(200).send(users);
});

/**
 * API for return 10 last messages
 * app.get('/message', async (req,res) => {...})
 * response: [{
 *   userName: string,
 *   message: string,
 *   createdAt: Date,
 *   messageId: string,
 * }]
 */

/**
 * API for return information about status users
 * app.get('/users', async (req,res) => { ... })
 * response: [
 *  { userName: string, status: boolean }
 * ]
 */

app.listen(
 process.env.PORT,
 () => console.log(`Server was started on ${process.env.PORT}`)
);