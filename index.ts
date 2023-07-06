import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port = 3000;
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hi' });
});

app.post('/', async (_req: Request, res: Response) => {

});

app.delete('/', async (req: Request, res: Response) => {

});

app.listen(port);