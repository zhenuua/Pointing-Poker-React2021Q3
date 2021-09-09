import React from 'react';

import style from './Pop-up.module.scss';

type PopUpType = {
  active: boolean,
  setActive: any,
};

const PopUp: React.FC<PopUpType> = ({ active, setActive, children }): JSX.Element => {
  return (
    <div
      className={active ? `${style.modal} ${style.active}` : style.modal}
      onClick={() => setActive(false)}
      aria-hidden="true"
    >
      <div
        className={active ? `${style.modalContent} ${style.active}` : style.modalContent}
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
