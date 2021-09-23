import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import activeCardImg from '../../assets/icons/choose.svg';

import style from './Lobby-page.module.scss';

import cardImgSrc1 from '../../assets/images/card-faces/blue.png';
import cardImgSrc2 from '../../assets/images/card-faces/logo.png';
import cardImgSrc3 from '../../assets/images/card-faces/red.png';
import CardCoffee from '../../components/card-coffee/CardCoffee';
import Card from '../../components/card/Card';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setCardValues, addCardValue } from '../../store/reducers/lobbySlice';

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
  const dispatch = useDispatch();
  const { gameSettings } = useTypedSelector((state) => state.lobbySlice);
  const { cardValues } = gameSettings;

  // useEffect(() => {
  //   dispatch(setCardValues(cardValues));
  // }, [cardValues]);
  const chengeFaceCard = (imageSrc: string) => {
    console.log('do active this card:', imageSrc);
  };
  const addCard = () => {
    console.log(cardValues);

    dispatch(addCardValue(0));
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
            <div
              key={item.imgSrc}
              onClick={() => chengeFaceCard(item.imgSrc)}
              aria-hidden="true"
              className={style.lobbyGameCards__faces__item}
            >
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
          <label htmlFor="input_file" className={style.lobbyGameCards__faces__itemAdd}>
            <input type="file" id="input_file" name="file" />
          </label>
        </div>
      </div>
      <h3 className={`${style.lobbyText} ${style.lobbyTextSubparagraph}`}>
        Add card values:
      </h3>
      <div className={style.lobbyGameCards__faces}>
        <CardCoffee />
        {cardValues.map((item) => {
          return <Card key={item} cardPoints={item} />;
        })}

        <div className={style.lobbyGameCards__faces__item}>
          <div
            className={style.lobbyGameCards__faces__itemAdd}
            aria-hidden="true"
            onClick={() => {
              addCard();
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default LobbyCards;
