import conversationRepository from '../repositories/conversations.repository';
import client from '../llm/client';

type ChatResponse = {
  id: string;
  message: string;
};

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
