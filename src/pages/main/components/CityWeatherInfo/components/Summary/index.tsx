import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addFavoriteCity } from 'src/store/slices/favoriteCitiesSlice';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';
import type { ResponseCurrentWeather } from 'src/api/currentWeatherSliceAPI/types';

type TProps = {
  city: ResponseCity | null;
  currentWeather?: ResponseCurrentWeather;
  isFetching: boolean;
  isError: boolean;
};

export const Summary: FC<TProps> = ({ city, currentWeather, isFetching, isError }) => {
  const dispatch = useDispatch();
  const handleToggleFavorites = (city: ResponseCity) => {
    dispatch(addFavoriteCity(city));
  };

  return (
    <Stack>
      <Typography>Summary</Typography>
      {city && (
        <Box>
          <Typography variant="h2">{city.name}</Typography>
          <Button variant="outlined" onClick={() => handleToggleFavorites(city)}>
            Toggle favorites
          </Button>
          <Button variant="outlined">Manage favorites</Button>
        </Box>
      )}
    </Stack>
  );
};
