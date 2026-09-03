import { Mistral } from '@mistralai/mistralai';

import conversationRepository from '../repositories/conversations.repository';
import type { ContentChunk } from '@mistralai/mistralai/models/components';

type ChatResponse = {
  id: string;
  message: string;
};

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const chartService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const messages = conversationRepository.getSetUserConversation(
      conversationId,
      prompt
    );
    const response = await client.chat.complete({
      model: 'mistral-small-latest',
      messages,
    });
    const content = (response?.choices?.[0]?.message?.content as string) ?? '';

    conversationRepository.setBotConversation(conversationId, content);
    return {
      id: conversationId,
      message: content,
    };
  },
};

export default chartService;
