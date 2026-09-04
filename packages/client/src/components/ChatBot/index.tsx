import { Skeleton } from '../ui/skeleton';
import Messages from './Messages';
import useChatBot from './useChatBot';
import SendMessage from './SendMessage';

const ChatBot = () => {
  const { messages, messageRef, isLoading, error, onSubmit, onKeyDown, form } =
    useChatBot();

  return (
    <div className="flex flex-col h-full">
      <div className="mb-1 pb-7 flex flex-col flex-1 gap-3 overflow-y-auto">
        <Messages messages={messages} ref={messageRef} />
        {isLoading && (
          <div className="flex w-full max-w-xs flex-col gap-2 self-start">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {Boolean(error) && <p className="text-red-300">{error}</p>}
      </div>
      <SendMessage form={form} onSubmit={onSubmit} onKeyDown={onKeyDown} />
    </div>
  );
};

export default ChatBot;
