import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useSocketsContext } from '../../context/socket.context';

import style from './Lobby-chat.module.scss';

const LobbyChat: React.FC = (): JSX.Element => {
  const { socket } = useSocketsContext();
  const activeChat = useSelector((state: any) => state.controlSlice.isActiveChat);

  const [formMessage, setFormMessage] = useState([{ name: 'Max', message: 'Hi Jim!' }]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const messageRef = useRef<HTMLDivElement>(null);

  const { socketId, roomId, username } = useTypedSelector((state) => state.userSlice);
  const { users } = useSelector((state: any) => state.lobbySlice);

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [currentMessage]);

  useEffect(() => {
    socket.on('ADD_MESSAGE', (data) => {
      // const currUser = users.filter(
      //   (item: any) => item.socketId === String(data.socketId),
      // );
      const curName = data.username;
      const curMsg = data.currentMessage;

      setFormMessage((state) => [
        ...state,
        {
          name: curName,
          message: curMsg,
        },
      ]);
    });
  }, [socket]);

  const handleSubmit = () => {
    if (/\S/.test(currentMessage)) {
      setFormMessage((state) => [
        ...state,
        {
          name: username,
          message: currentMessage,
        },
      ]);
      setCurrentMessage('');
    }
    socket.emit('SEND_MESSAGE', {
      currentMessage,
      socketId,
      roomId,
      username,
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
                  false ? style.greyBackground : ''
                }`}
              >
                <p>{item.message}</p>
              </div>
              <div
                className={`${style.chatMassage__player} ${
                  true ? style.greyBackground : ''
                }`}
              >
                <p>{item.name}</p>
              </div>
            </div>
          );
        })}
        <div />
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
