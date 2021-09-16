import React from 'react';

import style from './Timer.module.scss';

const TimerComponent: React.FC = (): JSX.Element => {
  return (
    <div className={style.timerWrapper}>
      <span className={style.number}>00</span>
      <h1 className={style.separator}>:</h1>
      <span className={style.min}>minutes</span>
      <span className={style.sec}>seconds</span>
      <span className={style.number}>00</span>
    </div>
  );
};

export default TimerComponent;
