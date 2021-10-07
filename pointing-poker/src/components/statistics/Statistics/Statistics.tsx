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

  useEffect(() => {
    players.length &&
      players[0].scores.forEach((item) => {
        const titleObject = {
          issueTitle: item.issueTitle,
          scores: [],
        };
        setValueArray(valueArray.push(titleObject));
      });
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
