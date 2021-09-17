import React from 'react';

import style from './ButtonSubmit.module.scss';

type ButtonType = {
  text: string,
  onclickHandler: () => void,
};

export const ButtonSubmit: React.FC<ButtonType> = ({
  text,
  onclickHandler,
}): JSX.Element => {
  return (
    <button
      type="button"
      onClick={() => {
        console.log('submit');
        onclickHandler();
      }}
      className={style.button}
    >
      {text}
    </button>
  );
};

export default ButtonSubmit;
