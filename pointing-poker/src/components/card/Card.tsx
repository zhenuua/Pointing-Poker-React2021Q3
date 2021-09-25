import React, { useState } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import editIcon from '../../assets/images/Edit-icon.svg';
import { ShortScoreTypes } from '../../store/reducers/lobbySlice';

import style from './Card.module.scss';

type CardPoints = {
  cardPoints: number,
  shortScoreType: ShortScoreTypes,
};

const Card: React.FC<CardPoints> = ({ cardPoints, shortScoreType }): JSX.Element => {
  const [isNumberCard, setIsNumberCard] = useState<number>(cardPoints);
  const [inputClassName, setInputClassName] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsNumberCard(+value);
  };

  let styleInput = '';
  let styleSpan = '';

  if (!inputClassName) {
    styleInput = `${style.input} ${style.up}`;
    styleSpan = `${style.number} ${style.down}`;
  } else {
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
        <h2 className={style.text}>{shortScoreType}</h2>
        <span className={styleSpan}>{isNumberCard}</span>
      </OutsideClickHandler>
    </div>
  );
};

export default Card;
