import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormPendingUsers } from '../../components/form-pending-users/FormPendingUsers';
import PopUp from '../../components/popup/PopUp';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { clearPendingUsers } from '../../store/reducers/lobbySlice';
import { UserRoles } from '../../store/types/sliceTypes';

export const PendingUsersPopup: React.FC = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const { userRole } = useTypedSelector((state) => state.userSlice);
  const { pendingUsers } = useTypedSelector((state) => state.lobbySlice);

  const onSubmitHandler = () => {
    setModalActive(false);
  };
  const onCancelHandler = () => {
    setModalActive(false);
    dispatch(clearPendingUsers());
  };

  return (
    <PopUp active={modalActive} setActive={setModalActive}>
      <FormPendingUsers
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      />
    </PopUp>
  );
};
