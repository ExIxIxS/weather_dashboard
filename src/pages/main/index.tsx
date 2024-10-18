import { type FC } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CityWeatherInfo } from 'src/pages/main/components/CityWeatherInfo';

export const MainPage: FC = () => {
  return (
    <Stack>
      <Typography variant="h1"> Weather Dashboard!</Typography>
      <CityWeatherInfo />
    </Stack>
  );
};
