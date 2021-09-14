import React from 'react';

import style from './ButtonCancel.module.scss';

type ButtonType = {
  text: string,
};

const ButtonCancel: React.FC<ButtonType> = ({ text }): JSX.Element => {
  return (
    <button type="button" className={style.button}>
      {text}
    </button>
  );
};

export default ButtonCancel;
