import type { Request, Response } from 'express';
import z from 'zod';

import chartService from '../services/chat.service';
import conversationRepository from '../repositories/conversations.repository';

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'prompt is required')
    .max(1000, 'max prompt is too long'),
  conversationId: z.uuid(),
});

const chatController = {
  async sendMessage(req: Request, res: Response) {
    const parseResult = chatSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json(z.treeifyError(parseResult.error));
      return;
    }
    try {
      const { prompt, conversationId } = req.body;

      const { message } = await chartService.sendMessage(
        prompt,
        conversationId
      );

      res.json({ message });
    } catch (error) {
      res.status(500).json({ error: 'some thing wrong' });
    }
  },
};

export default chatController;
