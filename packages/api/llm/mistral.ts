import { Mistral } from '@mistralai/mistralai';

type GenerateTextOptionsType = {
  model?: string;
  content: string;
  maxTokens?: number;
};

export const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const mistralLlm = {
  async generateText({
    model = 'ministral-8b-2512',
    maxTokens = 500,
    content,
  }: GenerateTextOptionsType) {
    const response = await client.chat.complete({
      model: model ?? 'ministral-8b-2512',
      maxTokens,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    return (response?.choices?.[0]?.message?.content as string) ?? '';
  },
};
