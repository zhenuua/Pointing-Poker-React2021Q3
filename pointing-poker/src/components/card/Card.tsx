import React, { useState } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import { useSelector } from 'react-redux';

import editIcon from '../../assets/images/Edit-icon.svg';
import { ShortScoreTypes } from '../../store/reducers/lobbySlice';
import style from './Card.module.scss';
import { RootState } from '../../store/store';

export type CardPoints = {
  cardPoints: any,
  shortScoreType?: ShortScoreTypes,
  gameOn?: boolean,
  setValueIssue?: any,
  restartRound?: boolean,
};

const Card: React.FC<CardPoints> = ({
  cardPoints,
  shortScoreType,
  gameOn = false,
  setValueIssue,
  restartRound = false,
}): JSX.Element => {
  const [isNumberCard, setIsNumberCard] = useState<number | string>(cardPoints);
  const [inputClassName, setInputClassName] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const { roundOn } = useSelector((state: RootState) => state.gameSlice);
  const {
    gameSettings: { cardChange },
  } = useSelector((state: RootState) => state.lobbySlice);
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
    <div
      className={roundOn ? style.cardWrapper : `${style.cardWrapper} ${style.border}`}
      onClick={gameOn ? () => setValueIssue(isNumberCard) : undefined}
      aria-hidden="true"
    >
      {!gameOn ? (
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
      ) : (
        <div className={style.card}>
          <div
            className={
              !roundOn && !restartRound ? style.front : `${style.front} ${style.flip}`
            }
          >
            <h2 className={style.text}>{shortScoreType}</h2>
            <span className={styleSpan}>{cardPoints}</span>
          </div>
          <div
            className={
              !roundOn && !restartRound ? style.back : `${style.back} ${style.flipBack}`
            }
          />
        </div>
      )}
    </div>
  );
};
export default Card;
