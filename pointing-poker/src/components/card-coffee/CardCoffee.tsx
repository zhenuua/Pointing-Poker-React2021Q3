import React from 'react';

import { useSelector } from 'react-redux';

import coffeeImage from '../../assets/images/Coffee.svg';
import style from './Card-coffee.module.scss';
import { RootState } from '../../store/store';

type TCardCoffee = {
  gameOn: boolean,
  setValueIssue: any,
  cardPoints: number | string,
  restartRound?: boolean,
};

const CardCoffee: React.FC<TCardCoffee> = ({
  gameOn,
  setValueIssue,
  cardPoints,
  restartRound = false,
}): JSX.Element => {
  const { roundOn } = useSelector((state: RootState) => state.gameSlice);
  return (
    <div
      className={style.wrapper}
      aria-hidden="true"
      onClick={gameOn ? () => setValueIssue(0) : undefined}
    >
      {!gameOn ? (
        <div className={style.card}>
          <div className={roundOn ? style.front : `${style.front} ${style.flip}`}>
            <span className={style.unknownUp}>Unknown</span>
            <span className={style.unknownDown}>Unknown</span>
            <img className={style.image} src={coffeeImage} alt="coffee icon" />
          </div>
          <div className={roundOn ? style.back : `${style.back} ${style.flipBack}`} />
        </div>
      ) : (
        <div className={style.card}>
          <div
            className={
              !roundOn && !restartRound ? style.front : `${style.front} ${style.flip}`
            }
          >
            <span className={style.unknownUp}>Unknown</span>
            <span className={style.unknownDown}>Unknown</span>
            <img className={style.image} src={coffeeImage} alt="coffee icon" />
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

export default CardCoffee;
