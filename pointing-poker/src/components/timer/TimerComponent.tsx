import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setRoundTime } from '../../store/reducers/lobbySlice';
import style from './Timer.module.scss';

type TimerType = {
  isEditMode: boolean,
  isStartTimer: boolean,
};
const TimerComponent: React.FC<TimerType> = ({
  isEditMode,
  isStartTimer,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { gameSettings } = useTypedSelector((state) => state.lobbySlice);
  const { roundTime } = gameSettings;
  const [seconds, setSeconds] = useState<number>(Math.floor(roundTime % 60));
  const [minutes, setMinutes] = useState<number>(Math.floor(roundTime / 60));
  useEffect(() => {
    if (!isStartTimer) {
      dispatch(setRoundTime(minutes * 60 + seconds));
    } else if (roundTime === 0) {
      console.log('time is over');
    } else {
      setTimeout(() => dispatch(setRoundTime(roundTime - 1)), 1000);
    }
  }, [roundTime, minutes, seconds]);

  const getMinutesTimer = (secondsMath: number) => {
    const minutesTimer = Math.floor(secondsMath / 60);
    return minutesTimer < 10 ? `0${minutesTimer}` : minutesTimer;
  };
  const getSecondsTimer = (secondsMath: number) => {
    const secondsTimer = secondsMath % 60;
    return secondsTimer < 10 ? `0${secondsTimer}` : secondsTimer;
  };
  const validate = (value: string, typeNum: string) => {
    const regexp = /\d+/;
    const mathedValue = value.match(regexp);
    if (mathedValue) {
      const newValue = +mathedValue[0];
      if (newValue > 59) {
        typeNum === 'seconds' ? setSeconds(59) : setMinutes(59);
      } else {
        typeNum === 'seconds' ? setSeconds(newValue) : setMinutes(newValue);
      }
    } else {
      typeNum === 'seconds' ? setSeconds(0) : setMinutes(0);
    }
  };

  return (
    <div>
      {isEditMode ? (
        <div className={style.timerWrapper}>
          <input
            className={style.number}
            type="text"
            value={minutes}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              validate(e.target.value, 'minutes');
            }}
          />
          <h1 className={style.separator}>:</h1>
          <span className={style.min}>minutes</span>
          <span className={style.sec}>seconds</span>
          <input
            className={style.number}
            type="text"
            value={seconds}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              validate(e.target.value, 'seconds');
            }}
          />
        </div>
      ) : (
        <div className={style.timerWrapper}>
          <span className={style.number}>{getMinutesTimer(roundTime)}</span>
          <h1 className={style.separator}>:</h1>
          <span className={style.min}>minutes</span>
          <span className={style.sec}>seconds</span>
          <span className={style.number}>{getSecondsTimer(roundTime)}</span>
        </div>
      )}
    </div>
  );
};

export default TimerComponent;
