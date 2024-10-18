import { useMemo, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { removeFavoriteCity, selectFavoriteCities } from 'src/store/slices/favoriteCitiesSlice';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { setSelectedCity } from 'src/store/slices/selectedCitySlice';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const FavoriteCitiesList: FC = () => {
  const dispatch = useDispatch();

  const cities = useSelector(selectFavoriteCities);
  const cityOptions = useMemo(
    () => cities.map((city) => ({ ...city, id: crypto.randomUUID() })),
    [cities]
  );

  const handleClickItem = (city: ResponseCity) => {
    dispatch(setSelectedCity(city));
  };

  const handleRemoveFavoriteCity = (city: ResponseCity) => {
    dispatch(removeFavoriteCity(city));
  };

  return (
    <Stack sx={{ minWidth: 400 }}>
      <Typography>Favorite Cities</Typography>
      <List component="div" disablePadding sx={{ position: 'absolute' }}>
        {cityOptions.map(({ id, name, country, lat, lon }) => (
          <ListItem
            key={id}
            onClick={() => handleClickItem({ name, country, lat, lon })}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveFavoriteCity({ name, country, lat, lon })}
              >
                <DeleteOutlineIcon />
              </IconButton>
            }
          >
            <ListItemText primary={name} secondary={country} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
