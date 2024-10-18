import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

export const Layout: FC = () => {
  return (
    <div className={styles['app-layout']}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
