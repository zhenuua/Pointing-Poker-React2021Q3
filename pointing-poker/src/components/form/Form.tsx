import React, { useState } from 'react';

import style from './Form.module.scss';

import avatar from '../../assets/images/Avatar(Auto).png';

type PopUpType = {
  setActive: any,
};

const Form: React.FC<PopUpType> = ({ setActive }): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jobPosition, setJobPosition] = useState<string>('');

  return (
    <form className={style.form}>
      <h1 className={style.headerForm}>Connect to lobby</h1>
      <label htmlFor="firstName">
        <span className={style.header}>Your first name:</span>
        <br />
        <input
          className={style.input}
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(event.target.value)
          }
        />
      </label>
      <label htmlFor="lastName">
        <span className={style.header}>Your last name:</span>
        <br />
        <input
          className={style.input}
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(event.target.value)
          }
        />
      </label>
      <label htmlFor="jobPosition">
        <span className={style.header}>Your job position:</span>
        <br />
        <input
          className={style.input}
          type="text"
          id="jobPosition"
          name="jobPosition"
          value={jobPosition}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setJobPosition(event.target.value)
          }
        />
      </label>
      <label htmlFor="input_file" className={style.labelFile}>
        <span className={style.header}>Image:</span>
        <br />
        <span className={style.imgButton}>Choose file:</span>
        <input className={style.inputTypeFile} type="file" id="input_file" name="file" />
        <button className={style.btn} type="button">
          Button
        </button>
        <img className={style.avatar} src={avatar} alt="avatar" />
      </label>
      <div className={style.btnWrapper}>
        <button className={`${style.buttonSubmit} ${style.button}`} type="submit">
          Confirm
        </button>
        <input
          className={`${style.buttonCancel} ${style.button}`}
          type="reset"
          value="Cancel"
          onClick={() => setActive(false)}
        />
      </div>
    </form>
  );
};

export default Form;
