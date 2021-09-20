import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import avatar from '../../assets/images/Avatar(Auto).png';
import { useActions } from '../../hooks/useActions';
import { UserRoles } from '../../store/types/sliceTypes';

import { FormType } from '../../types/types';

import style from './Form.module.scss';

const Form: React.FC<FormType> = ({ setActive, isConnect = false }): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jobPosition, setJobPosition] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  const history = useHistory();

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setUserImage(URL.createObjectURL(img));
    }
  };

  const {
    setUsername,
    setLastName: setLast,
    setJobPosition: setJob,
    setUserRole,
  } = useActions();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(firstName);
    setLast(lastName);
    setJob(jobPosition);
    setUserRole(UserRoles.USER_ADMIN);
    let id;
    if (isConnect) {
      console.log('logica playera, menyaem ID');
    } else {
      console.log('logica admina, menyaem ID');
    }
    // history.push(`/lobby-page/${id}`);
    // `/lobby-page/${response.data.lobbyId}`
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
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
        <input
          className={style.inputTypeFile}
          type="file"
          id="input_file"
          name="file"
          onChange={onImageChange}
        />
        <button className={style.btn} type="button">
          Button
        </button>
        {userImage ? (
          <img className={style.avatar} src={userImage} alt="avatar" />
        ) : (
          <img className={style.avatar} src={avatar} alt="avatar" />
        )}
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
