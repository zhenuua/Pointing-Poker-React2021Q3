import React from 'react';

import './Switcher.scss';

type SwitcherType = {
  status: boolean,
  setStatus: any,
};

export const Switcher: React.FC<SwitcherType> = ({ status, setStatus }): JSX.Element => {
  const cheangeSwither = ({ target: { checked } }: any): void => {
    console.log(checked);
  };

  return (
    <label className="switch" htmlFor="switcher">
      <input
        id="switcher"
        checked={status}
        type="checkbox"
        onChange={() => cheangeSwither}
      />
      <span className="slider round" />
    </label>
  );
};

export default Switcher;
