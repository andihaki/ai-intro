import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

const { MISTRAL_API_KEY } = dotenv.config;

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Test');
});

app.get('/api/ping', (req: Request, res: Response) => {
  res.send({ message: 'Pong!!' });
});

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
