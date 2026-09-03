import express from 'express';
import type { Request, Response } from 'express';

import chatController from './controlles/chat.controller';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Test');
});

router.get('/api/ping', (_req: Request, res: Response) => {
  res.send({ message: 'Pong!!' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
