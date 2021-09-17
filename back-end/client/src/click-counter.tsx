import React, { useState, FC } from 'react';

interface ClickCounterProps {
  value?: number;
}

export const ClickCounter: FC<ClickCounterProps> = ({ value = 0 }) => {
  // const { value } = props;
  const [count, setCount] = useState(value);

  console.log('kek');

  const a = 0;

  const akek = true;

  return (
    <div>
      <h3>Update the count and edit src/App.tsx, state is preserved</h3>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Count - {count}
      </button>
      {akek ? 'kek' : null}
    </div>
  );
};
