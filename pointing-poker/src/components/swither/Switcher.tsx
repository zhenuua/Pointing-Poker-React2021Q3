import React from 'react';

import './Switcher.scss';

type SwitcherType = {
  status: boolean,
  setStatus: (status: boolean) => void,
  id: string,
};

export const Switcher: React.FC<SwitcherType> = ({
  status,
  setStatus,
  id,
}): JSX.Element => {
  return (
    <label className="switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={status}
        onChange={() => {
          setStatus(!status);
        }}
      />
      <span className="slider round" />
    </label>
  );
};

export default Switcher;
