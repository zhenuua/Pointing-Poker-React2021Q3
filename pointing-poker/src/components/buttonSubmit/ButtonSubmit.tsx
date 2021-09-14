import React from 'react';

import style from './ButtonSubmit.module.scss';

type ButtonType = {
  text: string,
};

export const ButtonSubmit: React.FC<ButtonType> = ({ text }): JSX.Element => {
  return (
    <button type="button" className={style.button}>
      {text}
    </button>
  );
};

export default ButtonSubmit;
