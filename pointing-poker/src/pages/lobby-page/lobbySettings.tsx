import React, { ChangeEvent, useEffect, useState } from 'react';
import Switcher from '../../components/swither/Switcher';
import TimerComponent from '../../components/timer/TimerComponent';

import style from './Lobby-page.module.scss';

const LobbySettings: React.FC = (): JSX.Element => {
  const [masterAsPlayer, setMasterAsPlayer] = useState<boolean>(true);
  const [timerNeed, setTimerNeed] = useState<boolean>(true);
  const [changeCard, setChangeCard] = useState<boolean>(false);
  const [scoreType, setScoreType] = useState<string>('story point');
  const [scoreTypeShort, setScoreTypeShort] = useState<string>('SP');

  useEffect(() => {
    setScoreTypeShort(scoreType === 'story point' ? 'SP' : 'ST');
  }, [scoreType]);

  const changeScoreType = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setScoreType(value);
  };
  return (
    <section className={style.lobbyGameSettings}>
      <h2 className={`${style.lobbyText} ${style.lobbyTextTitle}`}>Game settings:</h2>
      <div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Scram master as player:</p>
          <Switcher
            status={masterAsPlayer}
            id="masterAsPlayer"
            setStatus={(status: boolean) => {
              setMasterAsPlayer(status);
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>
            Changing card in round end:
          </p>
          <Switcher
            status={changeCard}
            id="changeCard"
            setStatus={(status: boolean) => {
              setChangeCard(status);
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Is timer needed:</p>
          <Switcher
            status={timerNeed}
            id="timerNeed"
            setStatus={(status: boolean) => {
              setTimerNeed(status);
            }}
          />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Score type:</p>
          <select
            className={style.lobbyGameSettings__item__input}
            onChange={changeScoreType}
          >
            <option value="story point">story point</option>
            <option value="story time">story time</option>
          </select>
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Score type (Short):</p>
          <div className={style.lobbyGameSettings__item__input}>{scoreTypeShort}</div>
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Round time:</p>
          {timerNeed ? (
            <div>
              {' '}
              <TimerComponent isEditMode isStartTimer={false} />
              <TimerComponent isEditMode={false} isStartTimer />
            </div>
          ) : (
            <p className={style.lobbyGameSettings__item__title}>No timer</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LobbySettings;
