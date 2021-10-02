import React from 'react';

import { ButtonType } from '../../types/types';

import style from './Button-mini.module.scss';

const ButtonMini: React.FC<ButtonType> = ({ text, onClick }): JSX.Element => {
  return (
    <button type="button" className={style.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonMini;
