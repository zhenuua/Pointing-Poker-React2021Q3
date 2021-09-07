import React from 'react';

import style from './Main-page.module.scss';

import logo from '../../assets/images/Poker-Planning-logo.png';
import Form from '../../components/form/Form';

const MainPage: React.FC = (): JSX.Element => (
  <div className={style.main}>
    <h2 className={style.mainHeader}>MainPage</h2>
    <img className={style.mainLogo} src={logo} alt="logo" />
    <Form />
  </div>
);

export default MainPage;
