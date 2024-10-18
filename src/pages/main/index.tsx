import { type FC } from 'react';
import { useLazyGetCitiesByNameQuery } from 'src/api/citiesSliceAPI';

import styles from './styles.module.scss';

export const MainPage: FC = () => {
  const [fetchCitiesData, { data, isLoading, isError }] = useLazyGetCitiesByNameQuery();

  return (
    <div className={styles['page-content']}>
      <div className={styles['page-column']}>Weather Dashboard!</div>
      <button onClick={() => fetchCitiesData('Gdansk')}>Fetch!</button>
      {isError && <div>Error</div>}
      {isLoading && <div>Loading...</div>}
      <div>{JSON.stringify(data) && 'ok'}</div>
    </div>
  );
};
