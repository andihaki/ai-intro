import { Mistral } from '@mistralai/mistralai';

import conversationRepository from '../repositories/conversations.repository';

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

    const agentId = process.env.MISTRAL_AGENT_ID;
    if (!agentId)
      return {
        id: conversationId,
        message: 'Oops someting wrong!!!',
      };
    const response = await client.agents.complete({
      agentId,
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
