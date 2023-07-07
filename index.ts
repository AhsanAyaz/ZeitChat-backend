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

  io.emit("clientCount", io.eio.clientsCount);

  socket.on("newMessage", (newMessage: string) => {
    console.log("Message received: ", newMessage);
    io.emit('Message sent');
    console.log("Message sent");
  });

  socket.on('delete all', () => {
    deleteAll();
    io.emit('Message sent');
  });

  socket.on("disconnect", () => {
    console.log("Client has disconnected");

  });
});

app.get('/', async (_req: Request, res: Response) => {
  logger.debug('getting messages')
  const messages = await loadMessages();
  logger.debug('messages');
  logger.debug(messages);
  res.json(messages);
});

app.get('/hello', async (_req: Request, res: Response) => {
  logger.debug('hello world');
  res.json({
    hello: 'world'
  });
});

app.post('/', async (req: Request, res: Response) => {
  const message = await postMessage(req.body.text, req.body.userId);
  return message;
});

app.delete('/', async (req: Request, res: Response) => {

});

const ioPort = process.env.PORT || Number(port) + 1;

server.listen(ioPort, () => {
  console.log("socket listening to port: ", ioPort);
});
app.listen(port, () => {
  console.log("listening to port: ", port);
});