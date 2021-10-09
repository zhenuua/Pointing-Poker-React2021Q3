import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import IssueLobby from '../../components/issue-lobby/IssueLobby';
import Statistics from '../../components/statistics/Statistics/Statistics';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  fetchGamePlayers,
  fetchIssues,
  IGamePlayer,
} from '../../store/reducers/lobbySlice';
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
  const [downloadData, setDownloadData] = useState<any>([]);

  const fetchData = async () => {
    await Promise.resolve(dispatch(fetchIssues({ roomId })));
    await Promise.resolve(dispatch(fetchGamePlayers({ roomId: lobbyId })));
  };

  useEffect(() => {
    if (!roomId) {
      alert('please, try to connect through main page, redirecting...');
      history.push('/');
    }
    if (!players.length && !issues.length) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (players.length) {
      const arr: any = [];
      players[0].scores.forEach((issue) => {
        const obj = {
          issueTitle: issue.issueTitle,
          totalScores: [],
          scores: [],
        };
        arr.push(obj);
      });

      players.forEach((player) => {
        player.scores.forEach((score) => {
          const obj = arr.find((issue: any) => issue.issueTitle === score.issueTitle);
          if (obj) obj.totalScores.push(score.score);
        });
      });

      if (arr.length) {
        arr.forEach((issueObj: any) => {
          const { totalScores, scores } = issueObj;
          // scores.sort((a: number, b: number) => a - b);
          totalScores.sort((a: number, b: number) => a - b);
          while (totalScores.length) {
            const count =
              totalScores.lastIndexOf(totalScores[0]) -
              totalScores.indexOf(totalScores[0]) +
              1;
            scores.push({
              value: totalScores[0],
              count,
              votePercent: `${(count / players.length) * 100} %`,
            });

            totalScores.splice(0, count);
          }
        });
        setDownloadData(arr);
      }
    }
  }, [players]);

  const downloadTxt = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(downloadData, null, 2)], {
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
      <h1>GAME RESULT PAGE</h1>
      <button type="button" onClick={downloadTxt}>
        Download Game Results
      </button>
      {players.length &&
        issues.length &&
        issues.map((issue, issueIndex) => (
          <div key={issue.issueTitle}>
            <IssueLobby issueTitle={issue.issueTitle} priority={issue.priority} />
            <Statistics curScoreIndex={issueIndex} />
          </div>
        ))}
    </div>
  );
};
