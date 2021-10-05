import React from 'react';

import { ButtonType } from '../../types/types';

import style from './Button-white.module.scss';

const ButtonWhite: React.FC<ButtonType> = ({ text, onClick }): JSX.Element => {
  const clickHandler = () => {
    onClick && onClick();
  };
  return (
    <button type="button" className={style.button} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default ButtonWhite;
