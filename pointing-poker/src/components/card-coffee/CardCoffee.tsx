import React from 'react';

import coffeeImage from '../../assets/images/Coffee.svg';

import style from './Card-coffee.module.scss';

const CardCoffee: React.FC = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <span className={style.unknownUp}>Unknown</span>
      <span className={style.unknownDown}>Unknown</span>
      <img className={style.image} src={coffeeImage} alt="coffee icon" />
    </div>
  );
};

export default CardCoffee;
