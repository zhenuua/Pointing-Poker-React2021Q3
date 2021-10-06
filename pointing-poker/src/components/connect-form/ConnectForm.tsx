import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import avatar from '../../assets/images/Avatar(Auto).png';
import { useSocketsContext } from '../../context/socket.context';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  checkLobby,
  createLobby,
  setIsObserver,
  setUserAvatar,
} from '../../store/reducers/userSlice';
import { UserRoles } from '../../store/types/sliceTypes';
import { EVENTS } from '../../store/types/sockeIOEvents';
import { FormType } from '../../types/types';
import { Switcher } from '../swither/Switcher';

import style from './Forma.module.scss';

const ConnectForm: React.FC<FormType> = ({
  setActive,
  isConnect,
  lobbyLink = '',
}): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jobPosition, setJobPosition] = useState<string>('');
  const [isRoomId, setIsRoomId] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    roomId,
    socketId,
    isObserver,
    userRole,
    username,
    lastName: lastNamae,
  } = useTypedSelector((state) => state.userSlice);
  const { gameOn, gameOver } = useTypedSelector((state) => state.gameSlice);
  const [userImage, setUserImage] = useState<string>('');
  const { socket } = useSocketsContext();

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setUserImage(URL.createObjectURL(img));
    }
  };

  const { setUsername, setLastName: setLast, setJobPosition: setJob } = useActions();

  // const { socket } = useSocketsContext();

  const handleSwitch = () => {
    console.log('Switch Change');
    dispatch(setIsObserver());
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setUserRole(UserRoles.USER_ADMIN);
    // let id;
    setUsername(firstName);
    setLast(lastName);
    setJob(jobPosition);
    dispatch(setUserAvatar(userImage));
    if (isConnect) {
      // await Promise.all([dispatch(checkLobby({ lobbyId: lobbyLink }))]);
      // dispatch(checkLobby({ lobbyId: lobbyLink }));
      // socket.emit('lobby-connect', 'joining room lobby, dadada--------------');
      await Promise.resolve(dispatch(checkLobby({ lobbyId: lobbyLink })));
      setIsRoomId(true);
    } else {
      dispatch(
        createLobby({
          socketId,
          userRole: UserRoles.USER_ADMIN,
        }),
      );
      setIsRoomId(true);
      // socket.emit('lobby-create', '-----------creating room lobby, dadada');
    }
  };

  // checking if roomId changed, and redirects to lobby
  useEffect(() => {
    console.log('rerenders-------------');
    if (isRoomId && roomId) {
      // console.log(`gameOn: ---------${gameOn}`);
      // console.log(`gameOver: ---------${gameOver}`);
      // console.log(`roomId: ---------${roomId}`);
      // console.log(`userRole: ---------${userRole}`);
      if (gameOver) {
        console.log('gameOver, redirecting to main page...');
        alert('GAME ENDED, REDIRECTING TO GAME RESULTS...');
        history.push(`/game-result/${roomId}`);
        return;
      }
      if (gameOn) {
        console.log('game is on, wait for admin letting you in or round end...');
        socket.emit(EVENTS.CLIENT.PENDING_USER, {
          roomId,
          socketId,
          userRole,
          username: firstName,
          lastName,
        });
        alert('game is on, waiting for access...');
      } else {
        console.log('everything is ok, wait for redirecting...');
        history.push(`/lobby-page/${roomId}`);
      }
    }
  }, [isRoomId, roomId]);

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1 className={style.headerForm}>Connect to lobby</h1>
      {lobbyLink ? (
        <div className={style.switchWrapper}>
          <span className={style.switcherText}>Connect as Observer</span>
          <Switcher status={isObserver} setStatus={handleSwitch} id="observer" />
        </div>
      ) : (
        ''
      )}
      <label htmlFor="firstName">
        <span className={style.header}>Your first name:</span>
        <br />
        <input
          className={style.input}
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your name"
          value={firstName}
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(event.target.value)
          }
        />
      </label>
      <label htmlFor="lastName">
        <span className={style.header}>Your last name:</span>
        <br />
        <input
          className={style.input}
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(event.target.value)
          }
        />
      </label>
      <label htmlFor="jobPosition">
        <span className={style.header}>Your job position:</span>
        <br />
        <input
          className={style.input}
          type="text"
          id="jobPosition"
          name="jobPosition"
          placeholder="Enter your job position"
          value={jobPosition}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setJobPosition(event.target.value)
          }
        />
      </label>
      <label htmlFor="connect-form" className={style.labelFile}>
        <span className={style.header}>Image:</span>
        <br />
        <span className={style.imgButton}>Choose file:</span>
        <input
          className={style.inputTypeFile}
          type="file"
          id="connect-form"
          name="connect-form"
          onChange={onImageChange}
        />
        <button className={style.btn} type="button">
          Button
        </button>
        {userImage ? (
          <img className={style.avatar} src={userImage} alt="avatar" />
        ) : (
          <img className={style.avatar} src={avatar} alt="avatar" />
        )}
      </label>
      <div className={style.btnWrapper}>
        <button className={`${style.buttonSubmit} ${style.button}`} type="submit">
          Confirm
        </button>
        <input
          className={`${style.buttonCancel} ${style.button}`}
          type="reset"
          value="Cancel"
          onClick={() => setActive(false)}
        />
      </div>
    </form>
  );
};

export default ConnectForm;
