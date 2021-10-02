import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messenger from '../../assets/images/Messenger.svg';
import { isActiveChat } from '../../store/reducers/controlSlice';
import { RootState } from '../../store/store';

import style from '../header/Header.module.scss';

const ButtonIconChat: React.FC = (): JSX.Element => {
  const { isActiveChat: chat } = useSelector((state: RootState) => state.controlSlice);
  const dispatch = useDispatch();
  const handlerChat = () => {
    dispatch(isActiveChat());
  };
  return (
    <>
      <div className={style.btnChatWrapper} onClick={handlerChat} aria-hidden="true">
        {chat ? (
          <span className={style.textChatIcon}>Close Chat</span>
        ) : (
          <span className={style.textChatIcon}>Open Chat</span>
        )}
        <img
          className={style.messengerPicture}
          src={messenger}
          alt="messenger pictures"
          draggable={false}
        />
      </div>
    </>
  );
};

export default ButtonIconChat;
