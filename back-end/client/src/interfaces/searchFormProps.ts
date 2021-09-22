import { ChangeEvent } from 'react';

export interface SearchFormProps {
  submitHandler(event: ChangeEvent<HTMLFormElement>): void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}
