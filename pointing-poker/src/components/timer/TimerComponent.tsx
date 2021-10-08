import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setRoundOn } from '../../store/reducers/gameSlice';
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
  // const { roundOn } = useTypedSelector((state) => state.gameSlice);
  const { roundTime } = gameSettings;
  const [currentRoundTime, setCurrentRoundTime] = useState<number>(roundTime);
  const [seconds, setSeconds] = useState<number>(Math.floor(currentRoundTime % 60));
  const [minutes, setMinutes] = useState<number>(Math.floor(currentRoundTime / 60));

  useEffect(() => {
    setCurrentRoundTime(roundTime);
  }, [roundTime]);

  useEffect(() => {
    if (isEditMode) dispatch(setRoundTime(minutes * 60 + seconds));
  }, [minutes, seconds]);

  useEffect(() => {
    if (isStartTimer) {
      if (currentRoundTime === 0) {
        console.log('time is up');
        dispatch(setRoundOn(false));
        setCurrentRoundTime(roundTime);
      } else {
        setTimeout(() => setCurrentRoundTime(currentRoundTime - 1), 1000);
      }
    } else {
      setCurrentRoundTime(roundTime);
    }
  }, [currentRoundTime, isStartTimer]);

  const getMinutesTimer = (secondsMatch: number) => {
    const minutesTimer = Math.floor(secondsMatch / 60);
    return minutesTimer < 10 ? `0${minutesTimer}` : minutesTimer;
  };
  const getSecondsTimer = (secondsMatch: number) => {
    const secondsTimer = secondsMatch % 60;
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
          <span className={style.number}>{getMinutesTimer(currentRoundTime)}</span>
          <h1 className={style.separator}>:</h1>
          <span className={style.min}>minutes</span>
          <span className={style.sec}>seconds</span>
          <span className={style.number}>{getSecondsTimer(currentRoundTime)}</span>
        </div>
      )}
    </div>
  );
};

export default TimerComponent;
