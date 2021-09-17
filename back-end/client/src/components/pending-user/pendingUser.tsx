import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface PendingUserProps {
  userdata: string;
  deny: () => void;
  accept: () => void;
}

const PendingUser: React.FC<PendingUserProps> = ({ userdata, deny, accept }) => {
  // const { pendingUsers } = useTypedSelector((state) => state.userSlice);
  return (
    <li>
      <p>{userdata}</p>
      <button type="button" onClick={accept}>
        give access
      </button>
      <button type="button" onClick={deny}>
        deny access
      </button>
    </li>
  );
};

export default PendingUser;
