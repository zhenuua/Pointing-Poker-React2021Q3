import React from 'react';
import { useDispatch } from 'react-redux';

import ButtonSubmit from '../buttonSubmit/ButtonSubmit';
import ButtonCancel from '../buttonCancel/ButtonCancel';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import PersonalDataTab from '../personal-data-tab/PersonalDataTab';
import authorTest from '../../assets/images/ImageUser.png';
import { UserRoles } from '../../store/types/sliceTypes';

import style from './FormPendingUsers.module.scss';
import { removePendingUser } from '../../store/reducers/lobbySlice';

type PopUpType = {
  onSubmitHandler: () => void,
  onCancelHandler: () => void,
};

export const FormPendingUsers: React.FC<PopUpType> = ({
  onSubmitHandler,
  onCancelHandler,
}): JSX.Element => {
  const { pendingUsers } = useTypedSelector((state) => state.lobbySlice);
  const dispatch = useDispatch();

  const handleDeleteUser = (id: string, role: UserRoles) => {
    dispatch(removePendingUser({ socketId: id }));
  };

  return (
    <div className={style.popUpKickPlayer}>
      <h2 className={style.popUpKickPlayer__title}>Pending Users</h2>
      <p className={style.popUpKickPlayer__text}>
        Denay acces to particular users then submit form to let others to join or denay
        access to all!
      </p>
      <div className={style.popUpKickPlayer__playersColumn}>
        {pendingUsers.map((user) => {
          return (
            <PersonalDataTab
              userImage={user.avatarImg ? user.avatarImg : authorTest}
              userName={user.username}
              lastName={user.lastName}
              userStaff={user.jobPosition}
              isRemove
              key={`${user.socketId}`}
              socketId={user.socketId}
              userRole={user.userRole}
              deleteUser={handleDeleteUser}
              isCurrentUser={false}
            />
          );
        })}
      </div>
      <div className={style.popUpKickPlayer__control}>
        <ButtonSubmit
          onclickHandler={() => {
            onSubmitHandler();
          }}
          text="Give Access"
        />
        <ButtonCancel
          onclickHandler={() => {
            onCancelHandler();
          }}
          text="Deny Access"
        />
      </div>
    </div>
  );
};
