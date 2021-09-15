import React, { useState } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import editIcon from '../../assets/images/Edit-icon.svg';

import style from './Lobby-title.module.scss';

type LobbyTitleType = {
  isScrumMaster: boolean,
};

const LobbyTitle: React.FC<LobbyTitleType> = ({ isScrumMaster }): JSX.Element => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [isTitleText, setIsTitleText] = useState<string>(
    'Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)',
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsTitleText(value);
  };

  const isEditIcon = isScrumMaster
    ? `${style.removeIcon} ${style.active}`
    : style.removeIcon;

  return (
    <div className={style.titleWrapper}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsReadOnly(true);
        }}
      >
        <label htmlFor="title">
          <img
            className={isEditIcon}
            src={editIcon}
            alt="Edit-icon"
            onClick={() => {
              setIsReadOnly(false);
            }}
            aria-hidden="true"
          />
          <input
            className={style.inputLobbyTitle}
            type="text"
            id="title"
            value={isTitleText}
            readOnly={isReadOnly}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </OutsideClickHandler>
    </div>
  );
};

export default LobbyTitle;
