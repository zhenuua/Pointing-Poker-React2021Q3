import React, { ChangeEvent, useState } from 'react';

import pencil from '../../assets/icons/pencil.svg';
import urn from '../../assets/icons/urn.svg';
import issues from '../../pages/lobby-page/issues';

import style from './IssueLobby.module.scss';

type IssueLobbyType = {
  titleIssue: string,
  prority: string,
};

const IssueLobby: React.FC<IssueLobbyType> = ({ titleIssue, prority }): JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const editIssue = (item: string) => {
    console.log('editIssue', item);
    setEditMode(!editMode);
  };
  const deleteIssue = (item: string) => {
    console.log('deleteIssue', item);
  };
  const changePrority = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log('change', value);
  };
  return (
    <div className={style.lobbyIssues__item}>
      {editMode ? (
        <label htmlFor={titleIssue}>
          <input
            // value={titleIssue}
            id={titleIssue}
            placeholder={titleIssue}
            type="text"
            className={`${style.lobbyIssues__item__title} ${style.lobbyIssues__item__edittitle}`}
          />
          <select
            value={prority}
            className={style.lobbyIssues__item__propity}
            onChange={changePrority}
          >
            <option value="Low">Low prority</option>
            <option value="Middle">Middle prority</option>
            <option value="Hight">Hight prority</option>
          </select>
        </label>
      ) : (
        <p className={style.lobbyIssues__item__title}>
          {titleIssue}
          <span className={style.lobbyIssues__item__propity}>{prority} prority</span>
        </p>
      )}
      <div>
        <img
          aria-hidden="true"
          className={style.lobbyIssues__item__img}
          src={pencil}
          alt="edit issue"
          onClick={() => {
            editIssue(titleIssue);
          }}
        />
        <img
          className={style.lobbyIssues__item__img}
          src={urn}
          alt="delite issue"
          aria-hidden="true"
          onClick={() => deleteIssue(titleIssue)}
        />
      </div>
    </div>
  );
};

export default IssueLobby;
