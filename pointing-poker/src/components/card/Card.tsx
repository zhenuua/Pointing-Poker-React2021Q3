import React, { useState } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import editIcon from '../../assets/images/Edit-icon.svg';

import style from './Card.module.scss';

type TCard = {
  number: number,
};

const Card: React.FC = (): JSX.Element => {
  const [isNumberCard, setIsNumberCard] = useState<number>(1);
  const [inputClassName, setInputClassName] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsNumberCard(+value);
  };

  let styleInput = '';
  let styleSpan = 's';

  if (!inputClassName) {
    styleInput = `${style.input} ${style.up}`;
    styleSpan = `${style.number} ${style.down}`;
  } else if (inputClassName) {
    styleInput = `${style.input} ${style.up} ${style.active}`;
    styleSpan = `${style.number} ${style.down} ${style.active}`;
  }

  return (
    <div className={style.cardWrapper}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsReadOnly(true);
          setInputClassName(false);
        }}
      >
        <label htmlFor="input">
          <img
            className={style.removeIcon}
            src={editIcon}
            alt="edit-icon"
            onClick={() => {
              setIsReadOnly(false);
              setInputClassName(true);
            }}
            aria-hidden="true"
          />
          <input
            onChange={(e) => {
              if (e.target.value.length == 3) return;
              changeHandler(e);
            }}
            className={styleInput}
            type="number"
            id="input"
            value={isNumberCard}
            readOnly={isReadOnly}
          />
        </label>
        <h2 className={style.text}>SP</h2>
        <span className={styleSpan}>{isNumberCard}</span>
      </OutsideClickHandler>
    </div>
  );
};

export default Card;
