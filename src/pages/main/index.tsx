import { type FC } from 'react';
import { useLazyGetCitiesByNameQuery } from 'src/api/citiesSliceAPI';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const MainPage: FC = () => {
  const [fetchCitiesData, { data, isLoading, isError }] = useLazyGetCitiesByNameQuery();

  return (
    <Stack>
      <Typography variant="h1"> Weather Dashboard!</Typography>
      <Paper elevation={20} sx={{ p: 10, borderRadius: 12, flex: 1 }}>
        <button onClick={() => fetchCitiesData('Gdansk')}>Fetch!</button>
        {isError && <div>Error</div>}
        {isLoading && <div>Loading...</div>}
        <div>{JSON.stringify(data) && 'ok'}</div>
      </Paper>
    </Stack>
  );
};
