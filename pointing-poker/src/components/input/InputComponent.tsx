import * as React from 'react';

import style from './Input-component.module.scss';

const InputComponent: React.FC = (): JSX.Element => {
  return (
    <label htmlFor="input">
      <input className={style.input} type="text" id="input" />
    </label>
  );
};

export default InputComponent;
