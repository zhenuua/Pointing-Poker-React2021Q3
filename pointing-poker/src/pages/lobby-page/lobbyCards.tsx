import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import activeCardImg from '../../assets/icons/choose.svg';
import plusInCircle from '../../assets/icons/plusInCircle.svg';

import style from './Lobby-page.module.scss';

import cardImgSrc1 from '../../assets/images/card-faces/blue.png';
import cardImgSrc2 from '../../assets/images/card-faces/logo.png';
import cardImgSrc3 from '../../assets/images/card-faces/red.png';

const cardFaces = [
  {
    imgSrc: cardImgSrc1,
    isActive: true,
  },
  {
    imgSrc: cardImgSrc2,
    isActive: false,
  },
  {
    imgSrc: cardImgSrc3,
    isActive: false,
  },
];
const LobbyCards: React.FC = (): JSX.Element => {
  const chengeFaceCard = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('fff');
  };
  return (
    <section className={style.lobbyGameCards}>
      <h2 className={`${style.lobbyText} ${style.lobbyTextTitle}`}>Game cards:</h2>
      <h3 className={`${style.lobbyText} ${style.lobbyTextSubparagraph}`}>
        Select cover:
      </h3>
      <div className={style.lobbyGameCards__faces}>
        {cardFaces.map((item) => {
          return (
            <div className={style.lobbyGameCards__faces__item}>
              {/* onClick={chengeFaceCard} */}
              <img
                className={style.lobbyGameCards__faces__itemimg}
                src={item.imgSrc}
                alt="card face"
              />
              {item.isActive ? (
                <img
                  className={style.lobbyGameCards__faces__itemActive}
                  src={activeCardImg}
                  alt="card active"
                />
              ) : null}
            </div>
          );
        })}
        <div className={style.lobbyGameCards__faces__item}>
          {/* onClick={chengeFaceCard} */}
          <img
            className={style.lobbyGameCards__faces__itemAdd}
            src={plusInCircle}
            alt="add card face"
          />
        </div>
      </div>
      <h3 className={`${style.lobbyText} ${style.lobbyTextSubparagraph}`}>
        Add card values:
      </h3>
    </section>
  );
};

export default LobbyCards;
/* onClick={chengeFaceCard} */
