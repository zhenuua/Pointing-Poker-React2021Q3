import React from 'react';

import { PopUpType } from '../../types/types';

import style from './Pop-up.module.scss';

const PopUp: React.FC<PopUpType> = ({ active, setActive, children }): JSX.Element => {
  return (
    <div
      className={active ? `${style.modal} ${style.active}` : style.modal}
      onMouseDown={() => {
        setActive(false);
      }}
      aria-hidden="true"
    >
      <div
        className={active ? `${style.modalContent} ${style.active}` : style.modalContent}
        onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
