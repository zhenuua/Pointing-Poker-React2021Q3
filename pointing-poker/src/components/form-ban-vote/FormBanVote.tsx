import React from 'react';

import style from './FormBanVote.module.scss';

import ButtonSubmit from '../buttonSubmit/ButtonSubmit';
import ButtonCancel from '../buttonCancel/ButtonCancel';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type PopUpType = {
  onSubmitHandler: () => void,
  onCancelHandler: () => void,
  initiator: string,
  candidate: string,
};

export const FormBanVote: React.FC<PopUpType> = ({
  onSubmitHandler,
  onCancelHandler,
  initiator,
  candidate,
}): JSX.Element => {
  const { users } = useTypedSelector((state) => state.lobbySlice);
  const initiatorName = users.find((user) => user.socketId === initiator)?.username;
  const candidateName = users.find((user) => user.socketId === candidate)?.username;
  return (
    <div className={style.popUpKickPlayer}>
      <h2 className={style.popUpKickPlayer__title}>Kick player?</h2>
      <p className={style.popUpKickPlayer__text}>
        {`${initiatorName} `} wants to kick player
        <span className={style.popUpKickPlayer__text__namePlayer}>
          {' '}
          {` ${candidateName} `}{' '}
        </span>
        Do you agree with it?
      </p>
      <div className={style.popUpKickPlayer__control}>
        <ButtonSubmit
          onclickHandler={() => {
            onSubmitHandler();
          }}
          text="Yes"
        />
        <ButtonCancel
          onclickHandler={() => {
            onCancelHandler();
          }}
          text="No"
        />
      </div>
    </div>
  );
};
