import { useEffect, type FC } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { SearchPanel } from 'src/pages/main/components/CityWeatherInfo/components/SearchPanel';
import { Summary } from 'src/pages/main/components/CityWeatherInfo/components/Summary';
import { selectSelectedCity } from 'src/store/slices/selectedCitySlice';
import { useSelector } from 'react-redux';

export const CityWeatherInfo: FC = () => {
  const selectedCity = useSelector(selectSelectedCity);

  useEffect(() => console.log('selectedCity changed! -> ', selectedCity?.name), [selectedCity]);

  return (
    <Paper elevation={20} sx={{ p: 4, minHeight: 600, borderRadius: 12, flex: 1 }}>
      <Stack sx={{ flexDirection: 'row', gap: 4 }}>
        <Stack>
          <SearchPanel />
          <Summary />
        </Stack>
        <Stack>Info</Stack>
      </Stack>
    </Paper>
  );
};
