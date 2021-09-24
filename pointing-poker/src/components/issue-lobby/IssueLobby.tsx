import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IssuesPriority, removeIssue, editIssue } from '../../store/reducers/lobbySlice';
import pencil from '../../assets/icons/pencil.svg';
import urn from '../../assets/icons/urn.svg';

import style from './IssueLobby.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type IssueLobbyType = {
  issueTitle: string,
  priority: string,
};

const IssueLobby: React.FC<IssueLobbyType> = ({ issueTitle, priority }): JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [issueTitleCurrent, setIssueTitleCurrent] = useState<string>(issueTitle);
  const [issuePriorityCurrent, setIssuePriorityCurrent] = useState<string>(priority);
  const [prevIssueTitle, setPrevIssueTitle] = useState<string>(issueTitle);

  const dispatch = useDispatch();
  const { issues } = useTypedSelector((state) => state.lobbySlice);
  const updateIssue = () => {
    setEditMode(!editMode);
    if (
      editMode &&
      (!issueTitleCurrent ||
        issues.find((issue) => issue.issueTitle === issueTitleCurrent))
    ) {
      setIssueTitleCurrent(prevIssueTitle);
    } else {
      dispatch(
        editIssue({
          issueTitle: issueTitleCurrent,
          priority: issuePriorityCurrent,
          issueId: prevIssueTitle,
        }),
      );
      setPrevIssueTitle(issueTitleCurrent);
    }
  };
  const deleteIssue = (item: string) => {
    dispatch(removeIssue(item));
  };
  const changePrority = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setIssuePriorityCurrent(value);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIssueTitleCurrent(value.slice(0, 11));
  };
  return (
    <div
      className={style.lobbyIssues__item}
      aria-hidden="true"
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        console.log('клик в элементе');
        e.stopPropagation();
        // обработать клик вне элемента
      }}
    >
      {editMode ? (
        <label htmlFor={issueTitle}>
          <input
            value={issueTitleCurrent}
            id={issueTitle}
            placeholder={issueTitle}
            type="text"
            className={`${style.lobbyIssues__item__title} ${style.lobbyIssues__item__edittitle}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitle(e)}
          />
          <select
            value={issuePriorityCurrent}
            className={style.lobbyIssues__item__propity}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => changePrority(e)}
          >
            <option value={IssuesPriority.LOW}>{IssuesPriority.LOW} priority</option>
            <option value={IssuesPriority.MIDDLE}>
              {IssuesPriority.MIDDLE} priority
            </option>
            <option value={IssuesPriority.HIGH}>{IssuesPriority.HIGH} priority</option>
          </select>
        </label>
      ) : (
        <p className={style.lobbyIssues__item__title}>
          {issueTitle}
          <span className={style.lobbyIssues__item__propity}>{priority} prority</span>
        </p>
      )}
      <div>
        <img
          aria-hidden="true"
          className={style.lobbyIssues__item__img}
          src={pencil}
          alt="edit issue"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            updateIssue();
          }}
        />
        <img
          className={style.lobbyIssues__item__img}
          src={urn}
          alt="delite issue"
          aria-hidden="true"
          onClick={() => deleteIssue(issueTitle)}
        />
      </div>
    </div>
  );
};

export default IssueLobby;
