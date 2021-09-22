import React, { useEffect } from 'react';

interface Kek {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
}

const Inputt: React.FC<Kek> = ({ ref }) => {
  return <input type="text" ref={ref} />;
};

export default Inputt;
