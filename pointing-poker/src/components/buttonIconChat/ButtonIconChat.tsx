import React from 'react';
import { useDispatch } from 'react-redux';
import messenger from '../../assets/images/Messenger.svg';
import { isActiveChat } from '../../store/reducers/controlSlice';
import style from '../header/Header.module.scss';

const ButtonIconChat: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const handlerChat = () => {
    dispatch(isActiveChat());
  };
  return (
    <img
      className={style.messengerPicture}
      src={messenger}
      alt="messenger pictures"
      draggable={false}
      aria-hidden="true"
      onClick={handlerChat}
    />
  );
};

export default ButtonIconChat;
