import React, { useRef, useState, MutableRefObject } from 'react';

enum InputTypeEnum {
  RADIO = 'radio',
  TEXT = 'text',
  NUMBER = 'number',
}

type InputType = InputTypeEnum.RADIO | InputTypeEnum.TEXT;

interface IInput {
  type: InputType;
  placeholder?: string;
  defaultValue?: string;
  onChange: (
    e: React.SyntheticEvent<HTMLInputElement>,
    inputRef: MutableRefObject<HTMLInputElement | null>['current'],
  ) => void;
  checked?: boolean;
}

const Input: React.FC<IInput> = ({
  type,
  placeholder = 'enter your value',
  defaultValue = '',
  onChange,
  checked = false,
}) => {
  const [text, setText] = useState<string>(defaultValue);
  const [inputChecked, setInputChecked] = useState<boolean>(checked);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    onChange(e, inputRef.current);
    type === InputTypeEnum.RADIO
      ? setInputChecked(e.currentTarget.checked)
      : setText(e.currentTarget.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChangeHandler}
      checked={inputChecked}
      value={text}
      ref={inputRef}
    />
  );
};
