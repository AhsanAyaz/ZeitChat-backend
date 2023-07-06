import express, { Request, Response, Application } from 'express';
import { deleteAll, loadMessages, postMessage } from './db';
import cors from 'cors';

const app: Application = express();
const port = 3000;
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
  const messages = await loadMessages();
  res.json(messages);
});

app.post('/', async (req: Request, res: Response) => {
  const message = await postMessage(req.body.text, req.body.userId);
  return message;
});

app.delete('/', async (req: Request, res: Response) => {

});

server.listen(3001);
app.listen(3000);