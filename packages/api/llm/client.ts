import { Mistral } from '@mistralai/mistralai';
import { InferenceClient } from '@huggingface/inference';

export const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});
export const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

type GenerateTextOptionsType = {
  model?: string;
  content: string;
  maxTokens?: number;
};

export const llmClient = {
  async generateText({
    model = 'ministral-8b-2512',
    maxTokens = 500,
    content,
  }: GenerateTextOptionsType) {
    const response = await client.chat.complete({
      model,
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
  async summarizeReview(inputs: string) {
    try {
      const response = await inferenceClient.summarization({
        model: 'sshleifer/distilbart-cnn-12-6',
        inputs,
        provider: 'hf-inference',
      });

      return response.summary_text ?? '';
    } catch (error) {
      console.log(error);
      return '';
    }
  },
};
export default client;
