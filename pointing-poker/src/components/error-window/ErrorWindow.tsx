import React from 'react';

import style from './Error-window.module.scss';

type TErrorWindow = {
  text: string,
};

const ErrorWindow: React.FC<TErrorWindow> = ({ text }): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <span className={style.wrapperText}>{text}</span>
    </div>
  );
};

export default ErrorWindow;
