import React from 'react';

import style from './Footer.module.scss';

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__wrapper}>
        <a
          className={style.github}
          href="https://github.com/mrbarakd"
          target="_blank"
          rel="noopener noreferrer"
        >
          mrbarakd
        </a>
        <a
          className={style.github}
          href="https://github.com/zhenuua"
          target="_blank"
          rel="noopener noreferrer"
        >
          zhenuua
        </a>
        <a
          className={style.github}
          href="https://github.com/maxkalevich"
          target="_blank"
          rel="noopener noreferrer"
        >
          maxkalevich
        </a>
        <a
          className={style.rss}
          href="https://rs.school/react/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={style.rssYear}>&apos;21</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
