import { useEffect, type FC } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { SearchPanel } from 'src/pages/main/components/CityWeatherInfo/components/SearchPanel';
import { Summary } from 'src/pages/main/components/CityWeatherInfo/components/Summary';
import { selectSelectedCity } from 'src/store/slices/selectedCitySlice';
import { useSelector } from 'react-redux';
import { useLazyGetCurrentWeatherQuery } from 'src/api/currentWeatherSliceAPI';
import { useLazyGetForecastQuery } from 'src/api/forecastSliceAPI';
import { FavoriteCitiesList } from 'src/pages/main/components/CityWeatherInfo/components/FavoriteCitiesList';

export const CityWeatherInfo: FC = () => {
  const selectedCity = useSelector(selectSelectedCity);
  const [
    fetchCurrentWeatherData,
    {
      data: currentWeatherData,
      isFetching: isFetchingCurrentWeather,
      isError: isErrorCurrentWeather,
    },
  ] = useLazyGetCurrentWeatherQuery();

  const [fetchForecastData, { data: forecastData, isFetching, isError }] =
    useLazyGetForecastQuery();

  // useEffect(() => console.log('selectedCity changed! -> ', selectedCity?.name), [selectedCity]);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    const position = { lat: selectedCity.lat, lon: selectedCity.lon };

    fetchCurrentWeatherData(position);
    fetchForecastData(position);
  }, [selectedCity]);

  return (
    <Paper elevation={20} sx={{ p: 4, minHeight: 600, borderRadius: 12, flex: 1 }}>
      <Stack sx={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between' }}>
        <Stack>
          <SearchPanel />
          <Summary
            city={selectedCity}
            currentWeather={currentWeatherData}
            isFetching={isFetchingCurrentWeather}
            isError={isErrorCurrentWeather}
          />
        </Stack>
        <Stack>{currentWeatherData?.main.feels_like}</Stack>
        {isFetching && 'isLoading...'}
        {isError && 'ERROR!!!'}
        <Stack>Forecast</Stack>
        <FavoriteCitiesList />
      </Stack>
    </Paper>
  );
};
