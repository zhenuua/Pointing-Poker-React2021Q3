import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
// import { setUsername, setUserRole, setToken, setRoomId } from '../../store/reducers/userSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';

interface MainPageProps {
  setLobbyId: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
}

interface ParamsQueries {
  lobbyParam?: string;
}

export const MainPage: React.FC = () => {
  // const [lobbyName, setLobbyName] = useState('');
  const { lobbyParam } = useParams<ParamsQueries>();
  // console.log(lobbyParam);
  const history = useHistory();
  // const { username, roomId, userRole, token, lastName, socketId, chatMessages } = useTypedSelector(
  //   (state) => state.userSlice
  // );

  const { setUsername, setLastName, setSocketId, setUserRole, setToken, setRoomId, setJobPosition } = useActions();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const jobRef = useRef<HTMLInputElement | null>(null);
  const lobbyRef = useRef<HTMLInputElement | null>(null);
  const asSpectatorRef = useRef<HTMLInputElement | null>(null);
  // const nameConnectRef = useRef<HTMLInputElement | null>(null);
  // const lastNameConnectRef = useRef<HTMLInputElement | null>(null);

  const handleClickCreat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:5000/lobby/create',
        timeout: 2000,
      });

      setRoomId(response.data.lobbyId);
      setToken(response.data.adminToken);
      setUsername(nameRef.current!.value);
      setLastName(lastNameRef.current!.value);
      setJobPosition(jobRef.current!.value);
      setUserRole(UserRoles.USER_ADMIN);
      console.log(response.data);
      // console.log(nameRef.current!.value);

      history.push(`/lobby-page/${response.data.lobbyId}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleClickConnect = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const lobbyId = lobbyRef.current!.value;
      const response = await axios({
        method: 'get',
        url: 'http://localhost:5000/lobby/check',
        timeout: 2000,
        params: {
          lobbyId,
        },
      });
      if (response.status === 204) {
        alert('lobby not found');
        return;
      }
      console.log(response.data);
      setRoomId(lobbyId);
      setUsername(nameRef.current!.value);
      setLastName(lastNameRef.current!.value);
      setJobPosition(jobRef.current!.value);
      const role = asSpectatorRef.current!.checked ? UserRoles.USER_SPECTATOR : UserRoles.USER_PLAYER;
      setUserRole(role);

      history.push(`/lobby-page/${response.data.id}`);
      // response.status === 204 ? alert('lobby not found') : history.push(`/lobby-page/${response.data}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="name-input">
          <input
            ref={nameRef}
            type="text"
            placeholder="inter your name"
            name="name-input"
            id="name-input"
            required
            defaultValue="name-111"
          />
        </label>
        <label htmlFor="last-name-input">
          <input
            ref={lastNameRef}
            type="text"
            placeholder="inter your last name"
            name="last-name-input"
            id="last-name-input"
            required
            defaultValue="lastName-111"
          />
        </label>
        <label htmlFor="job-input">
          <input
            ref={jobRef}
            type="text"
            placeholder="inter your job position"
            name="job-input"
            id="job-input"
            required
            defaultValue="job-111"
          />
        </label>
        <label htmlFor="lobby-id">
          <input
            ref={lobbyRef}
            type="text"
            placeholder="inter lobby id"
            defaultValue={lobbyParam}
            name="lobby-id-input"
            id="lobby-id"
            // required
          />
        </label>
        <label htmlFor="spectator-input">
          connect as a spectator?
          <input type="checkbox" id="spectator-input" ref={asSpectatorRef} />
        </label>
        <button type="button" onClick={handleClickCreat}>
          create lobby
        </button>
        <button type="button" onClick={handleClickConnect}>
          connect to lobby
        </button>
      </form>
    </div>
  );
};
