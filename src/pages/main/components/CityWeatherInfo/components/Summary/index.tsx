import { useMemo, type FC, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { OutlinedAlert } from 'src/components/OutlinedAlert';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { selectFavoriteCities, toggleFavoriteCity } from 'src/store/slices/favoriteCitiesSlice';
import { getWeatherIconUrlById } from 'src/utils/getWeatherIconUrlById';
import { getCityId } from 'src/utils/getCityId';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';
import type { ResponseCurrentWeather } from 'src/api/currentWeatherSliceAPI/types';

type TProps = {
  city: ResponseCity | null;
  currentWeather?: ResponseCurrentWeather;
  isFetching: boolean;
  isError: boolean;
  onClickFavorites: (e: MouseEvent) => void;
};

export const Summary: FC<TProps> = ({
  city,
  currentWeather,
  isFetching,
  isError,
  onClickFavorites,
}) => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector(selectFavoriteCities);

  const handleToggleFavorites = (city: ResponseCity) => {
    dispatch(toggleFavoriteCity(city));
  };

  const isFavorite = useMemo(() => {
    return city
      ? !!favoriteCities.find((favoriteCity) => getCityId(favoriteCity) === getCityId(city))
      : false;
  }, [city, favoriteCities]);

  const weatherData = currentWeather?.weather.at(0);

  return (
    <Stack sx={{ overflow: 'auto', zIndex: 2 }}>
      {!city && (
        <Typography variant="h5" component="p">
          Choose city
        </Typography>
      )}
      {city && (
        <>
          <Box sx={{ minHeight: 300 }}>
            {isError && <OutlinedAlert>Data fetching error</OutlinedAlert>}
            {isFetching && (
              <Stack sx={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color="inherit" size={80} sx={{ my: 4 }} />
              </Stack>
            )}
            {!isFetching && currentWeather && (
              <Stack>
                <Typography variant="h2" component="p">
                  {currentWeather.main.temp} °C
                </Typography>
                <Typography variant="h4" component="p">
                  {currentWeather.main.humidity} %
                </Typography>
                <Typography variant="h4" component="p">
                  {currentWeather.wind.speed} m/s
                </Typography>
                {weatherData && (
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <img
                      src={`${getWeatherIconUrlById(weatherData.icon)}`}
                      width={80}
                      height={80}
                      alt={weatherData.main}
                      loading="lazy"
                    />
                    <Typography variant="h5" component="span">
                      {weatherData.description}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            )}
          </Box>
          <Box>
            <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
              <Typography variant="h4">{city.name}</Typography>
              <IconButton
                aria-label="heart"
                color="error"
                size="large"
                onClick={() => handleToggleFavorites(city)}
                sx={{ p: 2 }}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Stack>
            {currentWeather && (
              <Typography variant="h5" component="p">
                Sea level: {currentWeather.main.sea_level} m
              </Typography>
            )}
          </Box>
        </>
      )}
      <Button variant="outlined" sx={{ mt: 4 }} onClick={onClickFavorites}>
        Manage favorites
      </Button>
    </Stack>
  );
};
