import React, { MouseEvent, ChangeEvent, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import style from './Lobby-chat.module.scss';
import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import authorTest from '../../assets/images/ImageUser.png';
import dambldorImage from '../../assets/images/dambldor.jpg';
import roomsChats from './massages';

const currentUser = 'Zhenuua';
const activeChat = true;

const LobbyChat: React.FC = (): JSX.Element => {
  const [courantMassage, setСourantMassage] = useState<string>('');
  const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [roomsChats.room1]);
  const handleSubmit = () => {
    if (/\S/.test(courantMassage)) {
      console.log('send massage');
      roomsChats.room1.push({
        palyerName: currentUser,
        massage: courantMassage,
        isYou: true,
      });
      setСourantMassage('');
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setСourantMassage(value);
  };
  return (
    <section className={`${activeChat ? style.LobbyChat : style.LobbyChatOff}`}>
      <div className={style.wrapperChat}>
        {roomsChats.room1.map((item) => {
          return (
            <div key={item.massage + item.palyerName} className={style.chatMassage}>
              <div
                className={`${style.chatMassage__text} ${
                  item.isYou ? style.greyBackground : ''
                }`}
              >
                <p>{item.massage}</p>
              </div>
              <div
                className={`${style.chatMassage__player} ${
                  item.isYou ? style.greyBackground : ''
                }`}
              >
                <p>{item.palyerName}</p>
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
            value={courantMassage}
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
