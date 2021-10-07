import React, { useEffect, useState } from 'react';
import style from '../../../pages/game-page/Game-page.module.scss';
import CardStatistics from '../../card-statistics/CardStatistics';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

type TStatistics = {
  curScoreIndex: number | undefined,
};

const Statistics: React.FC<TStatistics> = ({ curScoreIndex }): JSX.Element => {
  const [valueArray, setValueArray] = useState<any>([]);

  const { players, curIssue, gameSettings } = useTypedSelector(
    (state) => state.lobbySlice,
  );
  const { shortScoreType } = gameSettings;

  // useEffect(() => {
  //   players.length &&
  //     players[0].scores.forEach((item) => {
  //       const titleObject = {
  //         issueTitle: item.issueTitle,
  //         scores: [],
  //       };
  //       setValueArray(valueArray.push(titleObject));
  //     });
  // }, [players]);

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
        arr.forEach((issue: any) => {
          const { totalScores, scores } = issue;
          scores.sort((a: number, b: number) => a - b);
          const newScore: any = [];
          if (scores.score !== null)
            while (totalScores.length) {
              const count =
                totalScores.lastIndexOf(totalScores[0]) -
                totalScores.indexOf(totalScores[0]) +
                1;
              newScore.push({
                value: totalScores[0],
                count,
              });

              totalScores.splice(0, count);
            }
          scores.push(newScore);
        });
      }
    }
  }, [players]);

  return (
    <div className={style.cardWrapper}>
      <div className={style.issuesText}>Statistics:</div>
      <div className={style.wrapperStat}>
        {players.map((player) => {
          return (
            curScoreIndex !== undefined &&
            player.scores[curScoreIndex].issueTitle === curIssue?.issueTitle && (
              <CardStatistics
                cardPoints={
                  player.scores[curScoreIndex].score !== null &&
                  player.scores[curScoreIndex].score
                }
                shortScoreType={shortScoreType}
                gameOn={false}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
