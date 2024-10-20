import { useEffect, useMemo, useRef, useState, type FC, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetCitiesByNameQuery } from 'src/api/citiesSliceAPI';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CircularProgress from '@mui/material/CircularProgress';
import { setSelectedCity } from 'src/store/slices/selectedCitySlice';
import { isResponseError } from 'src/api/utils';
import {
  DEFAULT_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  TIMEOUT_DEBOUNCE,
} from 'src/pages/main/components/CityWeatherInfo/components/SearchPanel/constants';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

export const SearchPanel: FC = () => {
  const dispatch = useDispatch();

  const [fetchCitiesData, { data, isFetching, isError, error }] = useLazyGetCitiesByNameQuery();
  const refDebouncedCityNameValue = useRef('');
  const [currentCityName, setCurrentCityName] = useState('');
  const [currentCityOptions, setCurrentCityOptions] = useState<(ResponseCity & { id: string })[]>(
    []
  );

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCityName = event.target.value;
    refDebouncedCityNameValue.current = newCityName;

    setTimeout(() => {
      if (currentCityName !== newCityName && refDebouncedCityNameValue.current === newCityName) {
        setCurrentCityName(newCityName);

        if (newCityName) {
          fetchCitiesData(newCityName);
        }
      }
    }, TIMEOUT_DEBOUNCE);

    setCurrentCityName(newCityName);
  };

  const handleCitySelect = (city: ResponseCity) => {
    dispatch(setSelectedCity(city));
    setCurrentCityName('');
    refDebouncedCityNameValue.current = '';
    setCurrentCityOptions([]);
  };

  const handleClickAway = () => {
    setCurrentCityOptions([]);
  };

  useEffect(() => {
    setCurrentCityOptions(
      data ? data.map((dataItem) => ({ ...dataItem, id: crypto.randomUUID() })) : []
    );
  }, [data]);

  const inputAdornment = (
    <InputAdornment position="end" aria-label="search status" sx={{ my: 1 }}>
      {isFetching ? <CircularProgress color="inherit" size={24} /> : <TravelExploreIcon />}
    </InputAdornment>
  );

  const helperText = useMemo(() => {
    if (isError) {
      return isResponseError(error) ? error.message.split('.')[0] : DEFAULT_ERROR_MESSAGE;
    }

    if (currentCityName && !isFetching && data && data.length === 0) {
      return NOT_FOUND_MESSAGE;
    }

    return '';
  }, [error, isError, isFetching, currentCityName, data]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack sx={{ width: 250, position: 'relative' }}>
        <TextField
          label="City name"
          value={currentCityName}
          variant="standard"
          type="text"
          fullWidth
          error={isError}
          helperText={helperText}
          onChange={handleSelectChange}
          autoComplete={'off'}
          sx={{ mb: 3, minHeight: 80 }}
          slotProps={{
            input: {
              endAdornment: inputAdornment,
            },
          }}
        />
        <Collapse
          in={
            !isFetching &&
            !isError &&
            !!(data?.length && currentCityOptions.length && currentCityName)
          }
          timeout="auto"
        >
          <List
            // component="div"
            disablePadding
            sx={{
              position: 'absolute',
              width: 280,
              backgroundColor: 'rgba(88, 89, 94, 0.96)',
              borderRadius: 1,
              zIndex: 1000,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            {currentCityOptions.map((city) => {
              const { id, name, country } = city;

              return (
                <ListItemButton
                  key={id}
                  sx={{
                    pl: 4,
                    opacity: 1,
                    borderRadius: 1,
                  }}
                  onClick={() => handleCitySelect(city)}
                >
                  <ListItemText primary={name} secondary={country} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </Stack>
    </ClickAwayListener>
  );
};
