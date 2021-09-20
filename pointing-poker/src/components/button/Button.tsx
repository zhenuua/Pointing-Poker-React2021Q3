import React from 'react';

import { ButtonType } from '../../types/types';

import style from './Button.module.scss';

const Button: React.FC<ButtonType> = ({ text }): JSX.Element => {
  return (
    <button type="button" className={style.button}>
      {text}
    </button>
  );
};

export default Button;
