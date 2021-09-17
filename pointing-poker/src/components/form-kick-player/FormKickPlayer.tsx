import React from 'react';

import style from './FormKickPlayer.module.scss';

import ButtonSubmit from '../buttonSubmit/ButtonSubmit';
import ButtonCancel from '../buttonCancel/ButtonCancel';

type PopUpType = {
  onSubmitHandler: () => void,
  onCancelHandler: () => void,
  namePlayer: string,
};

export const FormKickPlayer: React.FC<PopUpType> = ({
  onSubmitHandler,
  onCancelHandler,
  namePlayer,
}): JSX.Element => {
  return (
    <div className={style.popUpKickPlayer}>
      <h2 className={style.popUpKickPlayer__title}>Kick player?</h2>
      <p className={style.popUpKickPlayer__text}>
        Are you really want to remove playe
        <span className={style.popUpKickPlayer__text__namePlayer}>
          {' '}
          {` ${namePlayer} `}{' '}
        </span>
        from game session?
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

export default FormKickPlayer;
