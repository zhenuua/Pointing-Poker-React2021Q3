import React, { ChangeEvent, useEffect, useState } from 'react';

import ButtonSubmit from '../buttonSubmit/ButtonSubmit';
import ButtonCancel from '../buttonCancel/ButtonCancel';
import style from './FormCreateIssue.module.scss';

type PopUpType = {
  onSubmitHandler: () => void,
  onCancelHandler: () => void,
};

export const FormCreateIssue: React.FC<PopUpType> = ({
  onCancelHandler,
  onSubmitHandler,
}): JSX.Element => {
  const [titleIssue, seTitleIssue] = useState<string>('');
  const [priority, setPriority] = useState<string>('Low');

  useEffect(() => {
    seTitleIssue(titleIssue);
  }, [titleIssue]);

  return (
    <div className={style.popupCreateIssue}>
      <h2 className={style.popupCreateIssue__title}>Create Issue</h2>
      <div className={style.popupCreateIssue__options}>
        <label className={style.popupCreateIssue__options__item} htmlFor="titleIssue">
          <p className={style.popupCreateIssue__text}>Title:</p>
          <input
            value={titleIssue}
            className={`${style.popupCreateIssue__text} ${style.popupCreateIssue__input}`}
            id="titleIssue"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              seTitleIssue(e.target.value);
            }}
          />
        </label>
        <label className={style.popupCreateIssue__options__item} htmlFor="linkIssue">
          <p className={style.popupCreateIssue__text}>Link:</p>
          <input
            className={`${style.popupCreateIssue__text} ${style.popupCreateIssue__input}`}
            id="linkIssue"
            type="text"
          />
        </label>
        <label className={style.popupCreateIssue__options__item} htmlFor="priority">
          <p className={style.popupCreateIssue__text}>Priority:</p>
          <select
            className={style.popupCreateIssue__select}
            id="priority"
            value={priority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setPriority(e.target.value);
            }}
          >
            <option value="Low">Low</option>
            <option value="Middle">Middle</option>
            <option value="Hight">Hight</option>
          </select>
        </label>
      </div>

      <div className={style.popupCreateIssue__control}>
        <ButtonSubmit
          onclickHandler={() => {
            onSubmitHandler();
          }}
          text="Yes"
        />
        <ButtonCancel
          onclickHandler={() => {
            onCancelHandler();
          }}
          text="No"
        />
      </div>
    </div>
  );
};

export default FormCreateIssue;
