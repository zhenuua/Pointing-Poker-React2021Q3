import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchGamePlayers, IGamePlayer } from '../../store/reducers/lobbySlice';
import { checkLobby } from '../../store/reducers/userSlice';

interface ParamsQueries {
  lobbyId: string;
}

export const GameResult: React.FC = () => {
  const { users, players, issues } = useTypedSelector((state) => state.lobbySlice);
  const { gameOver } = useTypedSelector((state) => state.gameSlice);
  const { roomId } = useTypedSelector((state) => state.userSlice);
  const { lobbyId } = useParams<ParamsQueries>();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!roomId) {
      alert('please, try to connect through main page, redirecting...');
      history.push('/');
    }
    if (!players.length) {
      dispatch(fetchGamePlayers({ roomId: lobbyId }));
    }
  }, []);

  // useEffect(() => {
  // }, []);
  const downloadTxt = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(players, null, 2)], {
        type: 'text/plain',
      }),
    );
    a.setAttribute('download', `game-result-${roomId}.txt`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h1> game result page</h1>
      <div>get ready to make it</div>
      <button type="button" onClick={downloadTxt}>
        Download Game Results
      </button>
      {players.length &&
        players[0].scores.map((score) => (
          <div>
            <h3>Title {score.issueTitle}</h3>
            <p>score: {score.score}</p>
          </div>
        ))}
    </div>
  );
};
