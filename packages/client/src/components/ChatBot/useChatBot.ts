import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

import popSound from '@/assets/sounds/pop.mp3';
import notifSound from '@/assets/sounds/notification.mp3';

import type { FormType, MessageType, ChatResponseType } from './types';
const popAudio = new Audio(popSound);
popAudio.volume = 0.2;
const notifAudio = new Audio(notifSound);
notifAudio.volume = 0.2;

const useChatBot = () => {
  const conversationIdRef = useRef(crypto.randomUUID());
  const form = useForm<FormType>();
  const { handleSubmit, reset } = form;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messageRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = handleSubmit(async ({ prompt }: FormType) => {
    setIsLoading(true);
    setError('');
    popAudio.play();

    try {
      setMessages((prev) => [
        ...prev,
        {
          content: prompt,
          role: 'user',
        },
      ]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          prompt,
          conversationId: conversationIdRef.current,
        }),
      });
      if (!response.ok) {
        throw new Error(`Oops status: ${response.status}`);
      }

      const result = (await response.json()) as ChatResponseType;
      setMessages((prev) => [
        ...prev,
        {
          content: result.message,
          role: 'bot',
        },
      ]);
      notifAudio.play();

      messageRef.current?.scrollIntoView({
        behavior: 'smooth',
      });

      reset({ prompt: '' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  });

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return {
    form,
    messages,
    isLoading,
    error,
    onKeyDown,
    onSubmit,
    messageRef,
  };
};

export default useChatBot;
