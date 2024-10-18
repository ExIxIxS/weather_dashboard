import { type FC } from 'react';

import styles from './styles.module.scss';

export const MainPage: FC = () => {
  return (
    <div className={styles['page-content']}>
      <div className={styles['page-column']}>Weather Dashboard!</div>
    </div>
  );
};
