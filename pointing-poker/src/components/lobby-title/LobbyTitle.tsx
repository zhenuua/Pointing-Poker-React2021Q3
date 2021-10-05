import React, { useState } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import { useDispatch, useSelector } from 'react-redux';

import editIcon from '../../assets/images/Edit-icon.svg';

import { LobbyTitleType } from '../../types/types';
import style from './Lobby-title.module.scss';
import { RootState } from '../../store/store';
import { setTitleLobby } from '../../store/reducers/lobbySlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { EVENTS } from '../../store/types/sockeIOEvents';
import { useSocketsContext } from '../../context/socket.context';
import PopUpCheck from '../popup-check/PopUpCheck';
import CheckIcon from '../check-icon/CheckIcon';

const LobbyTitle: React.FC<LobbyTitleType> = ({ isScrumMaster }): JSX.Element => {
  const { isTitleLobby } = useSelector((state: RootState) => state.lobbySlice);
  const dispatch = useDispatch();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const { userRole } = useTypedSelector((state) => state.userSlice);
  const { roomId } = useTypedSelector((state) => state.userSlice);
  const { socket } = useSocketsContext();
  const [isCheck, setCheck] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setTitleLobby(value));
  };

  const isEditIcon = isScrumMaster
    ? `${style.removeIcon} ${style.active}`
    : style.removeIcon;

  const pressEnter = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter') {
      if (!isReadOnly) {
        setCheck(true);
      }

      setTimeout(() => setCheck(false), 500);
      setIsReadOnly(true);
      socket.emit(EVENTS.CLIENT.ADD_TITLE_LOBBY, {
        isTitleLobby,
        roomId,
      });
    }
  };

  return (
    <div className={style.titleWrapper}>
      <OutsideClickHandler
        onOutsideClick={() => {
          socket.emit(EVENTS.CLIENT.ADD_TITLE_LOBBY, {
            isTitleLobby,
            roomId,
          });
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
            onKeyPress={(e) => pressEnter(e)}
            placeholder={
              userRole === 'ADMIN'
                ? 'Enter the name of the room...'
                : '                           Welcome to the lobby !'
            }
            readOnly={isReadOnly}
            value={isTitleLobby}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </OutsideClickHandler>
      {isCheck ? (
        <PopUpCheck active={isCheck}>
          <CheckIcon />
        </PopUpCheck>
      ) : (
        ''
      )}
    </div>
  );
};

export default LobbyTitle;
