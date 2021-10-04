import React from 'react';

import { PopUpCheckType } from '../../types/types';

import style from './Pop-up-check.module.scss';

const PopUpCheck: React.FC<PopUpCheckType> = ({ active, children }): JSX.Element => {
  return (
    <div className={style.wrappers}>
      <div className={active ? `${style.modal} ${style.active}` : style.modal}>
        <div
          className={
            active ? `${style.modalContent} ${style.active}` : style.modalContent
          }
          onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopUpCheck;
