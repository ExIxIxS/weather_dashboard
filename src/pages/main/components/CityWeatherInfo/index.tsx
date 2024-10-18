import { useEffect, type FC } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { SearchPanel } from 'src/pages/main/components/CityWeatherInfo/components/SearchPanel';
import { Summary } from 'src/pages/main/components/CityWeatherInfo/components/Summary';
import { selectSelectedCity } from 'src/store/slices/selectedCitySlice';
import { useSelector } from 'react-redux';
import { useLazyGetCurrentWeatherQuery } from 'src/api/currentWeatherSliceAPI';

export const CityWeatherInfo: FC = () => {
  const selectedCity = useSelector(selectSelectedCity);
  const [fetchCurrentWeatherData, { data, isFetching, isError }] = useLazyGetCurrentWeatherQuery();

  // useEffect(() => console.log('selectedCity changed! -> ', selectedCity?.name), [selectedCity]);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    fetchCurrentWeatherData({ lat: selectedCity.lat, lon: selectedCity.lon });
  }, [selectedCity]);

  return (
    <Paper elevation={20} sx={{ p: 4, minHeight: 600, borderRadius: 12, flex: 1 }}>
      <Stack sx={{ flexDirection: 'row', gap: 4 }}>
        <Stack>
          <SearchPanel />
          <Summary />
        </Stack>
        <Stack>{data?.main.feels_like}</Stack>
        {isFetching && 'isLoading...'}
        {isError && 'ERROR!!!'}
      </Stack>
    </Paper>
  );
};
