import React, { useEffect, useState } from 'react';
import style from '../../../pages/game-page/Game-page.module.scss';
import CardStatistics from '../../card-statistics/CardStatistics';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

type TStatistics = {
  curScoreIndex: number | undefined,
};

const Statistics: React.FC<TStatistics> = ({ curScoreIndex }): JSX.Element => {
  const [valueArray, setValueArray] = useState<any>([]);
  const [percentValues, setPercentValues] = useState<any>([]);

  const { players, gameSettings } = useTypedSelector((state) => state.lobbySlice);
  const { shortScoreType } = gameSettings;

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
              votePercent: `${((count / players.length) * 100).toFixed(2)} %`,
            });

            totalScores.splice(0, count);
          }
        });
        setValueArray(arr);
      }
    }
  }, [players]);

  return (
    <div className={style.cardWrapper}>
      <div className={style.issuesText}>Statistics:</div>
      <div className={style.wrapperStat}>
        {curScoreIndex !== undefined &&
          curScoreIndex !== null &&
          valueArray.length &&
          valueArray[curScoreIndex].scores.map((score: any, index: number) => {
            return (
              <CardStatistics
                cardPoints={score.value}
                shortScoreType={shortScoreType}
                percent={score.votePercent}
                key={`${curScoreIndex}-${score.value}`}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Statistics;

// useEffect(() => {
//   if (players.length) {
//     const arr: any = [];
//     players[0].scores.forEach((issue) => {
//       const obj = {
//         issueTitle: issue.issueTitle,
//         totalScores: [],
//         scores: [],
//       };
//       arr.push(obj);
//     });

//     players.forEach((player) => {
//       player.scores.forEach((score) => {
//         const obj = arr.find((issue: any) => issue.issueTitle === score.issueTitle);
//         if (obj) obj.totalScores.push(score.score);
//       });
//     });

//     if (arr.length) {
//       arr.forEach((issue: any) => {
//         const { totalScores, scores } = issue;
//         scores.sort((a: number, b: number) => a - b);
//         if (scores.score !== null)
//           while (totalScores.length) {
//             const count =
//               totalScores.lastIndexOf(totalScores[0]) -
//               totalScores.indexOf(totalScores[0]) +
//               1;
//             scores.push({
//               value: totalScores[0],
//               count,
//             });

//             totalScores.splice(0, count);
//           }
//       });
//       setValueArray(arr);
//     }
//   }
// }, [players]);

// useEffect(() => {
//   // console.log(valueArray);
//   // console.log(curScoreIndex !== undefined && valueArray[curScoreIndex]);
//   const array = valueArray.map((issueObj: any) => {
//     const totalCount = players.length;
//     // console.log(totalCount);
//     return issueObj.scores.map((score: any) => (score.count * 100) / totalCount);
//   });
//   setPercentValues(array);
// }, [valueArray]);
