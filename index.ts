import express, { Request, Response, Application } from 'express';
import { loadMessages, postMessage } from './db';
import cors from 'cors';

const app: Application = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/', async (_req: Request, res: Response) => {
  const messages = await loadMessages();
  console.log(messages);
  res.json(messages);
});

app.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  const message = await postMessage(req.body.text, req.body.userId);
  return message;
});

app.delete('/', async (req: Request, res: Response) => {

});

app.listen(port);