import * as React from 'react';
import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import style from './Input-component.module.scss';

type InputProps = {
  setLobbyLink: React.Dispatch<React.SetStateAction<string>>,
};

interface ParamsQueries {
  lobbyParam?: string;
}

const InputComponent: React.FC<InputProps> = ({ setLobbyLink }): JSX.Element => {
  // const connectRef = React.useRef<HTMLInputElement | null>(null);
  // const connectLobby = (e: ChangeEvent) => {
  //   console.log(`${connectRef.current?.value}`);
  // };
  const { lobbyParam } = useParams<ParamsQueries>();

  return (
    <label htmlFor="input">
      <input
        className={style.input}
        type="text"
        id="input"
        defaultValue={lobbyParam}
        onChange={(e) => setLobbyLink(e.target.value)}
        // onChange={connectLobby}
      />
    </label>
  );
};

export default InputComponent;
