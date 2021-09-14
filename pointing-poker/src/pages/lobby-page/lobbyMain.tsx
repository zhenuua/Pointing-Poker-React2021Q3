import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import ButtonSubmit from '../../components/buttonSubmit/ButtonSubmit';
import ButtonCancel from '../../components/buttonCancel/ButtonCancel';
import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import pencil from '../../assets/icons/pencil.svg';
import style from './Lobby-page.module.scss';
import authorTest from '../../assets/images/ImageUser.png';

const LobbyMain: React.FC = (): JSX.Element => {
  return (
    <section className={style.lobbyMain}>
      <div className={style.lobbyMain__title}>
        <h2 className={style.lobbyText}>
          Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
        </h2>
        <img
          className={style.lobbyMain__title__settings}
          src={pencil}
          alt="title settings"
        />
      </div>
      <div className={style.lobbyMain__master}>
        <h3 className={style.lobbyTitle__text__scrum}>Scram master:</h3>
        <PersonalDataTab
          userImage={authorTest}
          userName="Tim Cook"
          userStaff="senior software"
          isCurrentUser
          isRemove={false}
        />
      </div>
      <div className={style.lobbyMain__link}>
        <h3 className={style.lobbyTitle__text__link}>Link to lobby:</h3>
        <div className={style.lobbyMain__link__copy}>
          <label htmlFor="link">
            <input
              className={style.lobbyMain__link__input}
              id="link"
              type="text"
              value="http://pockerplanning.c..."
            />
          </label>
          <ButtonSubmit text="Copy" />
        </div>
      </div>
      <div className={style.lobbyMain__control}>
        <ButtonSubmit text="Start Game" />
        <ButtonCancel text="Cancel game" />
      </div>
    </section>
  );
};

export default LobbyMain;
