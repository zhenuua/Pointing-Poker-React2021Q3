import { Console } from 'console';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormBanVote } from '../../components/form-ban-vote/FormBanVote';
import PopUp from '../../components/popup/PopUp';
import { useSocketsContext } from '../../context/socket.context';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { addBanVote } from '../../store/reducers/lobbySlice';
import { UserRoles } from '../../store/types/sliceTypes';
import { EVENTS } from '../../store/types/sockeIOEvents';

export const BanPopUpContainer: React.FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [banInitator, setBanInitator] = useState<string>('');
  const [banCandidate, setBanCandidate] = useState<string>('');
  const dispatch = useDispatch();
  const { users, banCandidates } = useTypedSelector((state) => state.lobbySlice);

  const {
    userRole,
    socketId,
    roomId: lobbyId,
  } = useTypedSelector((state) => state.userSlice);
  const { socket } = useSocketsContext();

  const onSubmitHandler = () => {
    if (userRole === UserRoles.USER_ADMIN) {
      dispatch(addBanVote({ candidateId: banCandidate, voterId: socketId }));
      setModalActive(false);
      return;
    }

    const adminId = users.find(
      (user) => user.userRole === UserRoles.USER_ADMIN,
    )?.socketId;

    socket.emit(EVENTS.CLIENT.BAN_VOTE_SUPPORTED, {
      initiatorId: socketId,
      candidateId: banCandidate,
      lobbyId,
      adminId,
    });
    setModalActive(false);
  };
  const onCancelHandler = () => {
    setModalActive(false);
  };

  useEffect(() => {
    socket.on(
      EVENTS.SERVER.USER_BAN_VOTE,
      ({ initiatorId, candidateId, roomId, originInitiator }) => {
        console.log(
          `vote from server has come!!!
        initiator: ${initiatorId}, candidate: ${candidateId} in room: ${roomId}`,
        );
        if (userRole === UserRoles.USER_ADMIN)
          dispatch(addBanVote({ candidateId, voterId: initiatorId }));

        if (socketId !== candidateId && originInitiator) {
          setBanInitator(initiatorId);
          setBanCandidate(candidateId);
          setModalActive(true);
        }
      },
    );
    // socket.on('notice_of_vote', (msg) => console.log(msg));
  }, []);

  return (
    <PopUp active={modalActive} setActive={setModalActive}>
      <FormBanVote
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
        initiator={banInitator}
        candidate={banCandidate}
      />
    </PopUp>
  );
};
