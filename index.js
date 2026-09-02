import { Mistral } from "@mistralai/mistralai";

import { MISTRAL_API_KEY } from "./rahasia.js";

const client = new Mistral({
  apiKey: MISTRAL_API_KEY,
});

// const response = await client.chat.complete({
const stream = await client.chat.stream({
  model: "mistral-medium-3-5",
  messages: [
    {
      role: "user",
      content: "write a short story about a indonesia president 2026",
    },
  ],
});

// const content = response.choices[0].message.content;
// console.log(response);
// console.log(content);
for await (const chunk of stream) {
  const content = chunk.data?.choices?.[0]?.delta?.content;
  process.stdout.write(content);
}
