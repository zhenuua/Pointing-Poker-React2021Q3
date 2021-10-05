import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  IssuesPriority,
  addIssue,
  removeIssue,
  postIssue,
} from '../../store/reducers/lobbySlice';
import ButtonSubmit from '../buttonSubmit/ButtonSubmit';
import ButtonCancel from '../buttonCancel/ButtonCancel';
import style from './FormCreateIssue.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';

type PopUpType = {
  onSubmitHandler: () => void,
  onCancelHandler: () => void,
};

export const FormCreateIssue: React.FC<PopUpType> = ({
  onCancelHandler,
  onSubmitHandler,
}): JSX.Element => {
  const [titleIssueСurrent, setTitleIssueСurrent] = useState<string>('');
  const [priorityСurrent, setPriorityСurrent] = useState<string>(IssuesPriority.LOW);
  const [errorTitle, setErrorTitle] = useState<string>('');
  const { userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const { gameOn } = useTypedSelector((state) => state.gameSlice);
  const { socket } = useSocketsContext();

  const dispatch = useDispatch();
  const { issues } = useTypedSelector((state) => state.lobbySlice);
  useEffect(() => {
    setTitleIssueСurrent(titleIssueСurrent);
  }, [titleIssueСurrent]);

  const createIssue = async () => {
    dispatch(
      addIssue({
        issueTitle: titleIssueСurrent,
        priority: priorityСurrent,
        issueId: titleIssueСurrent,
      }),
    );
    if (userRole === UserRoles.USER_ADMIN && gameOn) {
      console.log('emitting evetn when admin added issue');
      // const priority = priorityСurrent as IssuesPriority;
      await Promise.resolve(
        dispatch(
          postIssue({
            roomId,
            issue: {
              issueTitle: titleIssueСurrent,
              priority: priorityСurrent,
              issueId: titleIssueСurrent,
            },
          }),
        ),
      );
      socket.emit(EVENTS.CLIENT.GAME_ADD_ISSUE, {
        roomId,
        issue: {
          issueTitle: titleIssueСurrent,
          priority: priorityСurrent,
          issueId: titleIssueСurrent,
        },
      });
    }

    setTitleIssueСurrent('');
    setPriorityСurrent(IssuesPriority.LOW);
    setErrorTitle('');
  };
  const submitAddIsssue = () => {
    if (validateIssueTitle()) {
      createIssue();
      onSubmitHandler();
    }
  };
  const validateIssueTitle = () => {
    const isValid = true;
    const reNumber = /^[0-9]+$/;
    const reSimbols = /[~!@#$%*()_—+=|:;"'`<>,.?/^]+/;
    const reSpace = /^[ ]+$/;
    if (!titleIssueСurrent) {
      setErrorTitle('title cannot be empty');
      return !isValid;
    }
    if (titleIssueСurrent.length > 11) {
      setErrorTitle('the title cannot be longer than 11 simbols');
      return !isValid;
    }
    if (titleIssueСurrent.length < 3) {
      setErrorTitle('the title cannot be shorter than 3 simbols');
      return !isValid;
    }
    if (reNumber.test(titleIssueСurrent)) {
      setErrorTitle('the title cannot consist only of numbers');
      return !isValid;
    }
    if (reSpace.test(titleIssueСurrent)) {
      setErrorTitle('the title cannot consist only of spaces');
      return !isValid;
    }
    if (reSimbols.test(titleIssueСurrent)) {
      setErrorTitle('the title cannot consist only of simbols');
      return !isValid;
    }
    for (let i = 0; i < issues.length; i += 1) {
      if (issues[i].issueTitle === titleIssueСurrent) {
        setErrorTitle('Issue with this title already exists');
        return !isValid;
      }
    }
    return isValid;
  };
  return (
    <div className={style.popupCreateIssue}>
      <h2 className={style.popupCreateIssue__title}>Create Issue</h2>
      <div className={style.popupCreateIssue__options}>
        <label
          className={style.popupCreateIssue__options__item}
          htmlFor="titleIssueСurrent"
        >
          <p className={style.popupCreateIssue__text}>Title:</p>
          <input
            value={titleIssueСurrent}
            className={`${style.popupCreateIssue__text} ${style.popupCreateIssue__input}`}
            id="titleIssueСurrent"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitleIssueСurrent(e.target.value);
            }}
          />
          <span className={style.popupCreateIssue__title__error}>{errorTitle}</span>
        </label>
        {/* <label className={style.popupCreateIssue__options__item} htmlFor="linkIssue">
          <p className={style.popupCreateIssue__text}>Link:</p>
          <input
            className={`${style.popupCreateIssue__text} ${style.popupCreateIssue__input}`}
            id="linkIssue"
            type="text"
          />
        </label> */}
        <label className={style.popupCreateIssue__options__item} htmlFor="priority">
          <p className={style.popupCreateIssue__text}>Priority:</p>
          <select
            className={style.popupCreateIssue__select}
            id="priority"
            value={priorityСurrent}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setPriorityСurrent(e.target.value);
            }}
          >
            <option value={IssuesPriority.LOW}>{IssuesPriority.LOW}</option>
            <option value={IssuesPriority.MIDDLE}>{IssuesPriority.MIDDLE}</option>
            <option value={IssuesPriority.HIGH}>{IssuesPriority.HIGH}</option>
          </select>
        </label>
      </div>

      <div className={style.popupCreateIssue__control}>
        <ButtonSubmit
          onclickHandler={() => {
            submitAddIsssue();
          }}
          text="Yes"
        />
        <ButtonCancel
          onclickHandler={() => {
            onCancelHandler();
            setTitleIssueСurrent('');
            setPriorityСurrent(IssuesPriority.LOW);
            setErrorTitle('');
          }}
          text="No"
        />
      </div>
    </div>
  );
};

export default FormCreateIssue;
