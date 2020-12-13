import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

const app = express();
const port = 8080;

const connectionUrl = '';
mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const pusher = new Pusher({
  appId: "",
  key: "",
  secret: "",
  cluster: "ap1",
  useTLS: true
});


const db = mongoose.connection;

db.once('open', () => {
  console.log('DB is Connected');

  const msgConnection = db.collection('messagecontents');
  const changeStream = msgConnection.watch();

  changeStream.on('change', (change) => {

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('message', 'inserted', {
        _id: messageDetails._id,
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
      })
    } else {
      console.log('ERROR: Pusher')
    }
  })
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.post('/api/v1/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500);
      return;
    }

    res.status(201).send(data);
  });
});

app.get('/api/v1/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500);
      return;
    }

    res.status(200).send(data);
  });
});

app.listen(port, () => console.log(`Listening to port ${port}`));