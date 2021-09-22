import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import avatar from '../../assets/images/Avatar(Auto).png';
import { useSocketsContext } from '../../context/socket.context';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { checkLobby, createLobby } from '../../store/reducers/userSlice';
import { UserRoles } from '../../store/types/sliceTypes';

import { FormType } from '../../types/types';

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
  const { roomId, socketId } = useTypedSelector((state) => state.userSlice);
  const [userImage, setUserImage] = useState<string>('');

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const img = event.target.files[0];
      setUserImage(URL.createObjectURL(img));
    }
  };

  const {
    setUsername,
    setLastName: setLast,
    setJobPosition: setJob,
    setUserRole,
  } = useActions();

  // const { socket } = useSocketsContext();

  const handleSubmit1 = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setUserRole(UserRoles.USER_ADMIN);
    // let id;
    setUsername(firstName);
    setLast(lastName);
    setJob(jobPosition);
    if (isConnect) {
      dispatch(checkLobby({ lobbyId: lobbyLink }));
      setIsRoomId(true);
      // socket.emit('lobby-connect', 'joining room lobby, dadada--------------');
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
    if (isRoomId) {
      history.push(`/lobby-page/${roomId}`);
    }
  }, [roomId]);

  return (
    <form className={style.form} onSubmit={handleSubmit1}>
      <h1 className={style.headerForm}>Connect to lobby</h1>
      <label htmlFor="firstName">
        <span className={style.header}>Your first name:</span>
        <br />
        <input
          className={style.input}
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
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
