import { useEffect, type FC } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetCurrentWeatherQuery } from 'src/api/currentWeatherSliceAPI';
import { useLazyGetForecastQuery } from 'src/api/forecastSliceAPI';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { SearchPanel } from 'src/pages/main/components/CityWeatherInfo/components/SearchPanel';
import { Summary } from 'src/pages/main/components/CityWeatherInfo/components/Summary';
import { selectSelectedCity } from 'src/store/slices/selectedCitySlice';
import { FavoriteCitiesList } from 'src/pages/main/components/CityWeatherInfo/components/FavoriteCitiesList';

const BORDER_RADIUS_RESPONSIVE = { xs: 1, sm: 2, md: 4, xl: 8 };

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
    <Paper
      elevation={20}
      sx={{
        minHeight: 800,
        borderRadius: BORDER_RADIUS_RESPONSIVE,
        flex: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Stack
          sx={{
            width: {
              xs: 300,
              sm: 340,
            },
            borderRadius: {
              xs: '10px 0 0 10px',
              sm: '20px 0 0 20px',
              md: '40px 0 0 40px',
              xl: '80px 0 0 80px',
            },
            p: {
              xs: '10px 10px 10px 10px',
              sm: '20px 10px 20px 20px',
              md: '40px 20px 40px 40px',
              xl: '80px 20px 80px 80px',
            },
          }}
        >
          <SearchPanel />
          <Summary
            city={selectedCity}
            currentWeather={currentWeatherData}
            isFetching={isFetchingCurrentWeather}
            isError={isErrorCurrentWeather}
          />
        </Stack>
        <Stack>{currentWeatherData?.main.feels_like}</Stack>
        <Stack>Forecast</Stack>
        <FavoriteCitiesList />
      </Stack>
    </Paper>
  );
};
