import express, { Request, Response, Application } from 'express';
import { deleteAll, loadMessages, postMessage } from './db';
import cors from 'cors';
import logger from './logger';

const app: Application = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

io.on("connection", (socket: any) => {
  console.log("New client connected");
  socket.emit('Client', socket);

  socket.on("newMessage", (newMessage: string) => {

    io.emit('Message sent', newMessage);

  });

  socket.on('delete all', () => {
    deleteAll();
    io.emit('Deleted');
  });

  socket.on("disconnect", () => {
    console.log("Client has disconnected");
  });
});

app.get('/', async (_req: Request, res: Response) => {
  logger.debug('getting messages');
  const messages = await loadMessages();
  logger.debug('messages');
  logger.debug(messages);
  res.json(messages).status(200);
});

app.get('/hello', async (_req: Request, res: Response) => {
  logger.debug('hello world');
  res.json({
    hello: 'world'
  });
});

app.post('/', async (req: Request, res: Response) => {
  const message = await postMessage(req.body.text, req.body.userId);
  res.json(message).status(201);
});

server.listen(port, () => {
  console.log("server listening to port: ", port);
});
