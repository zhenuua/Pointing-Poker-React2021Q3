import React from 'react';

import check from '../../assets/images/Check.png';
import style from '../error-window/Error-window.module.scss';

const CheckIcon: React.FC = (): JSX.Element => {
  return (
    <div>
      <img src={check} className={style.wrapperText} />
    </div>
  );
};

export default CheckIcon;
