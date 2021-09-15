import React from 'react';

import style from './Button-mini.module.scss';

type ButtonType = {
  text: string,
};

const ButtonMini: React.FC<ButtonType> = ({ text }): JSX.Element => {
  return (
    <button type="button" className={style.button}>
      {text}
    </button>
  );
};

export default ButtonMini;
