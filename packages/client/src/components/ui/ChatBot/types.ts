export type FormType = {
  prompt: string;
};

export type ChatResponseType = {
  message: string;
};

export type MessageType = {
  content: string;
  role: 'user' | 'bot';
};
