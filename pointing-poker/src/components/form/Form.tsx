import React, { useState } from 'react';

import style from './Form.module.scss';

const Form: React.FC = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jobPosition, setJobPosition] = useState<string>('');

  return (
    <form>
      <label htmlFor="firstName">
        <span>Your first name name:</span>
        <input
          className={style.firstName}
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
        <span>Your last name:</span>
        <input
          className={style.lastName}
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
        <span>Your job position:</span>
        <input
          className={style.jobPosition}
          type="text"
          id="jobPosition"
          name="jobPosition"
          value={jobPosition}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setJobPosition(event.target.value)
          }
        />
      </label>
      <label htmlFor="input_file">
        <span>Image:</span>
        <input
          className={style.inputTypeFile}
          type="file"
          id="input_file"
          name="file"
          placeholder="Прикрепите файл"
        />
      </label>
    </form>
  );
};

export default Form;
