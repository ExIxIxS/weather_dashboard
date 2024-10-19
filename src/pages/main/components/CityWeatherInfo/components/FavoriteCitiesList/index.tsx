import { useMemo, type Dispatch, type SetStateAction, type FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Drawer from '@mui/material/Drawer';
import { setSelectedCity } from 'src/store/slices/selectedCitySlice';
import { removeFavoriteCity, selectFavoriteCities } from 'src/store/slices/favoriteCitiesSlice';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

type TProps = {
  isShown: boolean;
  setIsShown: Dispatch<SetStateAction<boolean>>;
};

export const FavoriteCitiesList: FC<TProps> = ({ isShown, setIsShown }) => {
  const dispatch = useDispatch();

  const cities = useSelector(selectFavoriteCities);
  const cityOptions = useMemo(
    () => cities.map((city) => ({ ...city, id: crypto.randomUUID() })),
    [cities]
  );

  const handleClickItem = (city: ResponseCity) => {
    dispatch(setSelectedCity(city));
  };

  const handleRemoveFavoriteCity = (e: MouseEvent, city: ResponseCity) => {
    e.stopPropagation();
    dispatch(removeFavoriteCity(city));
  };

  const handleClickAway = () => {
    if (isShown) {
      setIsShown(false);
    }
  };

  return (
    <Drawer anchor={'right'} open={isShown} onClose={handleClickAway}>
      <Stack sx={{ width: 300, px: 2, py: 4 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Favorite Cities
        </Typography>
        {!cityOptions.length && (
          <Typography variant="h5" component="p">
            No favorite cities
          </Typography>
        )}
        <List>
          {cityOptions.map(({ id, name, country, lat, lon }) => (
            <ListItemButton
              key={id}
              sx={{ ':hover': { cursor: 'pointer' }, mb: 1 }}
              onClick={() => handleClickItem({ name, country, lat, lon })}
            >
              <ListItemText primary={name} secondary={country} />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e: MouseEvent) =>
                  handleRemoveFavoriteCity(e, { name, country, lat, lon })
                }
              >
                <DeleteOutlineIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Drawer>
  );
};
