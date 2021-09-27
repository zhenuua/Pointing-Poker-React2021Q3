import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useSocketsContext } from '../../context/socket.context';
import avatarDefault from '../../assets/images/ImageUser.png';
import PersonalDataTabMini from '../personal-data-tab-mini/PersonalDataTabMini';
import { TLobbyChat } from '../../types/types';
import { RootState } from '../../store/store';

import style from './Lobby-chat.module.scss';
import { EVENTS } from '../../store/types/sockeIOEvents';

const LobbyChat: React.FC = (): JSX.Element => {
  const { socket } = useSocketsContext();
  const activeChat = useSelector((state: RootState) => state.controlSlice.isActiveChat);

  const [formMessage, setFormMessage] = useState<TLobbyChat[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const messageRef = useRef<HTMLDivElement>(null);
  const { socketId, roomId, username, avatarImg, lastName, jobPosition } =
    useTypedSelector((state) => state.userSlice);

  const { users } = useSelector((state: RootState) => state.lobbySlice);

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [currentMessage]);

  useEffect(() => {
    socket.on(EVENTS.CLIENT.ADD_MESSAGE, (data) => {
      const currUser = users.filter(
        (item: any) => item.socketId === String(data.socketId),
      );
      console.log(currUser);
      const curName = `${data.username} ${data.lastName}`;
      const curMsg = data.currentMessage;
      const curAva = data.avatarImg;
      const jobPos = data.jobPosition;
      setFormMessage((state) => [
        ...state,
        {
          name: curName,
          message: curMsg,
          ava: curAva,
          isCurrentUser: false,
          jobPosition: jobPos,
        },
      ]);
    });
  }, [socket]);

  const handleSubmit = () => {
    if (/\S/.test(currentMessage)) {
      setFormMessage((state) => [
        ...state,
        {
          name: `${username} ${lastName}`,
          message: currentMessage,
          ava: avatarImg,
          isCurrentUser: true,
          jobPosition,
        },
      ]);
      setCurrentMessage('');
    }

    socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {
      currentMessage,
      socketId,
      roomId,
      username,
      avatarImg,
      lastName,
      jobPosition,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentMessage(value);
  };

  return (
    <section className={`${activeChat ? style.LobbyChat : style.LobbyChatOff}`}>
      <div className={style.wrapperChat}>
        {formMessage.map((item) => {
          return (
            <div key={Math.random() * 1000} className={style.chatMassage}>
              <div
                className={`${style.chatMassage__text} ${
                  item.isCurrentUser ? style.greyBackground : ''
                }`}
              >
                <span className={item.isCurrentUser ? style.circular : style.none} />
                <p>{item.message}</p>
              </div>
              <PersonalDataTabMini
                userName={item.name}
                userImage={item.ava ? item.ava : avatarDefault}
                isCurrentUser={item.isCurrentUser}
                userStaff={item.jobPosition}
              />
            </div>
          );
        })}
        <div ref={messageRef} />
      </div>
      <form
        className={style.massageSend}
        onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="send-massage">
          <input
            id="send-massage"
            className={style.massageSend__input}
            type="text"
            value={currentMessage}
            onChange={handleChange}
          />
        </label>
        <button className={style.massageSend__button} type="submit">
          send
        </button>
      </form>
    </section>
  );
};

export default LobbyChat;
