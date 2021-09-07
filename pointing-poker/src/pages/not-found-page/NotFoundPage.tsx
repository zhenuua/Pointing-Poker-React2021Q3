import React from 'react';

import style from './Not-found-page.module.scss';

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1 className={style.notFoundHeader}>Page Not Found...</h1>
    </div>
  );
};

export default NotFoundPage;
