import React from 'react';

import style from './Button-white.module.scss';

type ButtonType = {
  text: string,
};

const ButtonWhite: React.FC<ButtonType> = ({ text }): JSX.Element => {
  return (
    <button type="button" className={style.button}>
      {text}
    </button>
  );
};

export default ButtonWhite;
