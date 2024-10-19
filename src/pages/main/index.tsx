import { type FC } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CityWeatherInfo } from 'src/pages/main/components/CityWeatherInfo';

export const MainPage: FC = () => {
  return (
    <Stack sx={{ py: 4, gap: 4 }}>
      <Typography variant="h2"> Weather Dashboard</Typography>
      <CityWeatherInfo />
    </Stack>
  );
};
