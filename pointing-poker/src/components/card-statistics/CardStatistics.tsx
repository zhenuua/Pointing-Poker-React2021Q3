import React, { useState } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import { useSelector } from 'react-redux';

import editIcon from '../../assets/images/Edit-icon.svg';
import { ShortScoreTypes } from '../../store/reducers/lobbySlice';
import style from './Card-statistics.module.scss';
import { RootState } from '../../store/store';

export type CardPoints = {
  cardPoints: any,
  shortScoreType?: ShortScoreTypes,
  gameOn?: boolean,
  setValueIssue?: any,
  percent: number | null,
};

const CardStatistics: React.FC<CardPoints> = ({
  cardPoints,
  shortScoreType,
  gameOn = false,
  setValueIssue,
  percent,
}): JSX.Element => {
  const [isNumberCard, setIsNumberCard] = useState<number | string>(cardPoints);
  const [inputClassName, setInputClassName] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  console.log(cardPoints);
  return (
    <div className={`${style.cardWrapper} ${style.border}`}>
      <div className={style.card}>
        <h2 className={style.text}>
          {cardPoints === null ? shortScoreType : shortScoreType}
        </h2>
        <span className={`${style.input} ${style.up}`}>
          {cardPoints === 0 ? 'unknown' : cardPoints}
        </span>
        <span className={`${style.input} ${style.down}`}>
          {cardPoints === 0 ? 'unknown' : cardPoints}
        </span>
      </div>
      <p className={style.percent}>{`${percent?.toFixed(2)}%`}</p>
    </div>
  );
};
export default CardStatistics;
