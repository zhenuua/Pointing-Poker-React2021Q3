import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import Switcher from '../../components/swither/Switcher';

import style from './Lobby-page.module.scss';

import cardImgSrc1 from '../../assets/images/card-faces/blue.png';
import cardImgSrc2 from '../../assets/images/card-faces/logo.png';
import cardImgSrc3 from '../../assets/images/card-faces/red.png';

const issues = [
  {
    title: 'Issue 542',
    prority: 'Low',
  },
  {
    title: 'Issue 911',
    prority: 'Middle',
  },
  {
    title: 'Issue 418',
    prority: 'Hight',
  },
];

const cardFaces = [
  {
    imgSrc: cardImgSrc1,
    isActive: false,
  },
  {
    imgSrc: cardImgSrc2,
    isActive: false,
  },
  {
    imgSrc: cardImgSrc3,
    isActive: true,
  },
];
const LobbySettings: React.FC = (): JSX.Element => {
  const [masterAsPlayer, setMasterAsPlayer] = useState<boolean>(true);
  const [timerNeed, setTimerNeed] = useState<boolean>(false);
  const [scoreType, setScoreType] = useState<string>('story point');
  const [scoreTypeShort, setScoreTypeShort] = useState<string>('SP');

  useEffect(() => {
    setScoreTypeShort(scoreType === 'story point' ? 'SP' : 'ST');
  }, [scoreType]);

  const changeMasterAsPlayer = () => {
    setMasterAsPlayer(!masterAsPlayer);
  };

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
          <Switcher status={masterAsPlayer} setStatus={() => setMasterAsPlayer} />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>
            Changing card in round end:
          </p>
          {/* <Switcher switcherMode={false} /> */}
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Is timer needed:</p>
          <Switcher status={timerNeed} setStatus={() => setTimerNeed} />
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Score type:</p>
          <select
            className={style.lobbyGameSettings__item__input}
            onChange={changeScoreType}
          >
            <option>story point</option>
            <option>story time</option>
          </select>
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Score type (Short):</p>
          <div className={style.lobbyGameSettings__item__input}>{scoreTypeShort}</div>
          {/* <select className={style.lobbyGameSettings__item__input} value={scoreTypeShort}>
            <option>SP</option>
            <option>ST</option>
          </select> */}
        </div>
        <div className={style.lobbyGameSettings__item}>
          <p className={style.lobbyGameSettings__item__title}>Round time:</p>
          {timerNeed ? <div>TIMER</div> : null}
        </div>
      </div>

      {/* onChange={() => changeSwither()} */}
    </section>
  );
};

export default LobbySettings;
