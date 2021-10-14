import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonMini from '../../components/button-blue-mini/ButtonMini';
import Switcher from '../../components/swither/Switcher';
import TimerComponent from '../../components/timer/TimerComponent';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  ScoreTypes,
  setCardValues,
  setScoreType,
  setTimerNeeded,
  setCardChange,
  setScramMaster,
  setResultsVoted,
  setAutoConnect,
  setGameSettings,
} from '../../store/reducers/lobbySlice';
import { configLobby } from './config';
import style from './Lobby-page.module.scss';

const LobbySettings: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { gameSettings, resultsVoted } = useTypedSelector((state) => state.lobbySlice);
  const { cardChange, scoreType, shortScoreType, scramMaster, timerNeeded, autoConnect } =
    gameSettings;

  const changeScoreType = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch(setScoreType(value));

    if (value === ScoreTypes.STORY_POINT) {
      dispatch(setCardValues(configLobby.cardCollections.STORY_POINT));
    } else if (value === ScoreTypes.FIBBONACCI) {
      dispatch(setCardValues(configLobby.cardCollections.FIBBONACCI));
    } else {
      dispatch(setCardValues(configLobby.cardCollections.FIBBONACCI));
    }
  };

  const setDefaultSettings = () => {
    localStorage.setItem(
      'pointing-poker-default-gameSettings',
      JSON.stringify(gameSettings),
    );
    // console
  };

  // useEffect(() => {
  //   const defaultSettings = localStorage.getItem('pointing-poker-default-gameSettings');
  //   if (defaultSettings) dispatch(setGameSettings(JSON.parse(defaultSettings)));
  // }, []);

  return (
    <section className={style.lobbyGameSettings}>
      <h2 className={`${style.lobbyText} ${style.lobbyTextTitle}`}>Game settings:</h2>
      <div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Scram master as player:</p>
          <Switcher
            status={scramMaster}
            id="masterAsPlayer"
            setStatus={(status: boolean) => {
              dispatch(setScramMaster(status));
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>
            Changing card in round end:
          </p>
          <Switcher
            status={cardChange}
            id="cardChange"
            setStatus={(status: boolean) => {
              dispatch(setCardChange(status));
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>
            Show results if everyone voted:
          </p>
          <Switcher
            status={resultsVoted}
            id="resultsVoted"
            setStatus={(status: boolean) => {
              dispatch(setResultsVoted(status));
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>User auto connect:</p>
          <Switcher
            status={autoConnect}
            id="autoConnect"
            setStatus={(status: boolean) => {
              dispatch(setAutoConnect(status));
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Is timer needed:</p>
          <Switcher
            status={timerNeeded}
            id="timerNeed"
            setStatus={(status: boolean) => {
              dispatch(setTimerNeeded(status));
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Score type:</p>
          <select
            className={style.lobbyGameSettings__item__input}
            onChange={changeScoreType}
          >
            <option
              value={ScoreTypes.FIBBONACCI}
              selected={ScoreTypes.FIBBONACCI === scoreType}
            >
              {ScoreTypes.FIBBONACCI}
            </option>
            <option
              value={ScoreTypes.STORY_POINT}
              selected={ScoreTypes.STORY_POINT === scoreType}
            >
              {ScoreTypes.STORY_POINT}
            </option>
          </select>
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Score type (Short):</p>
          <div className={style.lobbyGameSettings__item__input}>{shortScoreType}</div>
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Round time:</p>
          {timerNeeded ? (
            <TimerComponent isEditMode isStartTimer={false} />
          ) : (
            <p className={style.lobbyGameSettings__item__title}>No timer</p>
          )}
        </div>
        <div className={style.lobbyGameSettings__item}>
          <ButtonMini text="set default settings" onClick={setDefaultSettings} />
        </div>
      </div>
    </section>
  );
};

export default LobbySettings;
