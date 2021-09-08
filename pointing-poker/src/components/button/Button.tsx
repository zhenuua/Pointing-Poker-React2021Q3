import React from 'react';

import style from './Button.module.scss';

type ButtonType = {
  text: string,
};

const Button: React.FC<ButtonType> = ({ text }): JSX.Element => {
  return (
    <button type="button" className={style.button}>
      {text}
    </button>
  );
};

export default Button;
