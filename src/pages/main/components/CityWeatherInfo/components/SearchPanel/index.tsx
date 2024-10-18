import { ChangeEvent, useEffect, useRef, useState, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetCitiesByNameQuery } from 'src/api/citiesSliceAPI';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { setSelectedCity } from 'src/store/slices/selectedCitySlice';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

const TIMEOUT_DEBOUNCE = 2000;

export const SearchPanel: FC = () => {
  const dispatch = useDispatch();

  const [fetchCitiesData, { data, isLoading, isError }] = useLazyGetCitiesByNameQuery();
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

  useEffect(() => {
    setCurrentCityOptions(
      data ? data.map((dataItem) => ({ ...dataItem, id: crypto.randomUUID() })) : []
    );
  }, [data]);

  return (
    <Stack>
      <TextField
        label="City name"
        value={currentCityName}
        variant="outlined"
        type="text"
        sx={{ mb: 3 }}
        fullWidth
        error={isError}
        helperText={isError && 'Error text'}
        onChange={handleSelectChange}
        autoComplete={'off'}
      />
      <Collapse
        in={!isLoading && !isError && !!(currentCityOptions.length && currentCityName)}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding sx={{ position: 'absolute' }}>
          {currentCityOptions.map((city) => {
            const { id, name, country } = city;

            return (
              <ListItemButton key={id} sx={{ pl: 4 }} onClick={() => handleCitySelect(city)}>
                <ListItemText primary={name} secondary={country} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </Stack>
  );
};
