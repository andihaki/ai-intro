import ReactMarkdown from 'react-markdown';
import type { ClipboardEvent, Ref } from 'react';

import type { MessageType } from './types';

interface Props {
  messages: MessageType[];
  ref: Ref<HTMLDivElement>;
}

const Messages = ({ messages, ref }: Props) => {
  const onCopy = (e: ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? ref : null}
          onCopy={onCopy}
          className={`py-2 px-6 rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start'}`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </>
  );
};

export default Messages;
