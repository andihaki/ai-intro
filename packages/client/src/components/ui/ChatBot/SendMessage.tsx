import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../button';
import type { KeyboardEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { FormType } from './types';

interface Props {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void | undefined>;
  onKeyDown: (e: KeyboardEvent<HTMLFormElement>) => void;
  form: UseFormReturn<FormType>;
}

const SendMessage = ({ onSubmit, onKeyDown, form }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-2xl"
    >
      <textarea
        {...form.register('prompt', {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask me anything..."
        maxLength={1000}
        autoFocus
      />
      <Button
        disabled={!form.formState.isValid}
        className="rounded-full w-9 h-9"
        type="submit"
      >
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default SendMessage;
