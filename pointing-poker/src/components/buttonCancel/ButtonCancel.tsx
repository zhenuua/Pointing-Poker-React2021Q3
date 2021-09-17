import React from 'react';

import style from './ButtonCancel.module.scss';

type ButtonType = {
  text: string,
  onclickHandler: () => void,
};

const ButtonCancel: React.FC<ButtonType> = ({ text, onclickHandler }): JSX.Element => {
  return (
    <button
      type="button"
      onClick={() => {
        console.log('cancel');
        onclickHandler();
      }}
      className={style.button}
    >
      {text}
    </button>
  );
};

export default ButtonCancel;
