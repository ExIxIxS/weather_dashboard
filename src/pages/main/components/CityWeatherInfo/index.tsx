import { MouseEvent, useEffect, useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetCurrentWeatherQuery } from 'src/api/currentWeatherSliceAPI';
import { useLazyGetForecastQuery } from 'src/api/forecastSliceAPI';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { SearchPanel } from 'src/pages/main/components/CityWeatherInfo/components/SearchPanel';
import { Summary } from 'src/pages/main/components/CityWeatherInfo/components/Summary';
import { FavoriteCitiesList } from 'src/pages/main/components/CityWeatherInfo/components/FavoriteCitiesList';
import { Forecast } from 'src/pages/main/components/CityWeatherInfo/components/Forecast';
import { VideoBackground } from 'src/pages/main/components/CityWeatherInfo/components/VideoBackground';
import { selectSelectedCity } from 'src/store/slices/selectedCitySlice';

const BORDER_RADIUS_RESPONSIVE = { xs: 1, sm: 2, md: 4, xl: 8 };

export const CityWeatherInfo: FC = () => {
  const selectedCity = useSelector(selectSelectedCity);

  const [isShownFavorites, setIsShownFavorites] = useState(false);

  const [
    fetchCurrentWeatherData,
    {
      data: currentWeatherData,
      isFetching: isFetchingCurrentWeather,
      isError: isErrorCurrentWeather,
    },
  ] = useLazyGetCurrentWeatherQuery();

  const [
    fetchForecastData,
    { data: forecastData, isFetching: isFetchingForecast, isError: isErrorForecast },
  ] = useLazyGetForecastQuery();

  const currentWeather = currentWeatherData?.weather.at(0);

  const handleSummaryClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsShownFavorites(true);
  };

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
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <VideoBackground weatherId={currentWeather?.id} />
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <Stack
          sx={{
            width: {
              xs: 300,
              sm: 340,
            },
            minHeight: { xs: 'initial', xl: 800 },
            borderRadius: {
              xs: '10px 0 10px 0',
              sm: '20px 0 20px 0',
              md: '40px 0 40px 0',
              xl: '80px 0 0 0',
            },
            p: {
              xs: '10px 10px 10px 10px',
              sm: '20px 10px 20px 20px',
              md: '40px 20px 40px 40px',
              xl: '80px 20px 80px 60px',
            },
            backdropFilter: 'blur(10px)',
          }}
        >
          <SearchPanel />
          <Summary
            city={selectedCity}
            currentWeather={currentWeatherData}
            isFetching={isFetchingCurrentWeather}
            isError={isErrorCurrentWeather}
            onClickFavorites={handleSummaryClick}
          />
        </Stack>
        <FavoriteCitiesList isShown={isShownFavorites} setIsShown={setIsShownFavorites} />
        <Forecast
          city={selectedCity}
          forecast={forecastData}
          isFetching={isFetchingForecast}
          isError={isErrorForecast}
        />
      </Stack>
    </Paper>
  );
};
