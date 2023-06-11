const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');

const PORT = 8000;

const emitter = new events.EventEmitter();

// emitter.on('event-1', (data) => {
//  console.log(`[on] event: event-1, data:${JSON.stringify(data)}`);
// });
// emitter.on('event-2', (data) => {
//  console.log(`[on] event: event-2, data:${JSON.stringify(data)}`);
// });
// emitter.once('event-1', (data) => {
//  console.log(`[once] event: event-1, data:${JSON.stringify(data)}`);
// });

// emitter.emit('event-1', { data: 'this is event 1 data 1' });
// emitter.emit('event-1', { data: 'this is event 1 data 2' });
// emitter.emit('event-1', { data: 'this is event 1 data 3' });
// emitter.emit('event-x', { data: 'this is event x data 1' });
// emitter.emit('event-2', { data: 'this is event 2 data 1' });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/messages', (req, res) => {
 emitter.once('new-message', (message) => {
  res.status(200).send({ message });
 });
});

app.post('/messages', (req, res) => {
 const message = req.body;
 console.log('message:', message);
 emitter.emit('new-message', message);
 return res.status(200).send();
});

app.listen(PORT, () => console.log(`Server was started on ${PORT}`));