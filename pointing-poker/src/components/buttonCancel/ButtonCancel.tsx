import React from 'react';

import style from './ButtonCancel.module.scss';

type ButtonType = {
  text: string,
  onclickHandler: () => void,
  cancelPlay?: () => void,
};

const ButtonCancel: React.FC<ButtonType> = ({
  text,
  onclickHandler,
  cancelPlay,
}): JSX.Element => {
  return (
    <button
      type="button"
      onClick={() => {
        console.log('cancel');
        onclickHandler();
        if (cancelPlay) {
          cancelPlay();
        }
      }}
      className={style.button}
    >
      {text}
    </button>
  );
};

export default ButtonCancel;
