import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCityId } from 'src/utils/getCityId';
import { getStorageItem } from 'src/store/utils/getStorageItem';
import { setStorageItem } from 'src/store/utils/setStorageItem';
import { isResponseCity } from 'src/api/citiesSliceAPI/utils';
import { STORAGE_ITEM_TYPE } from 'src/store/constants';
import type { RootState } from 'src/store';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

const storageState = getStorageItem(STORAGE_ITEM_TYPE.FAVORITE_CITIES);

const initialState: ResponseCity[] =
  Array.isArray(storageState) && storageState.every((item) => isResponseCity(item))
    ? storageState
    : [];

const favoriteCitiesSlice = createSlice({
  name: 'favoriteCities',
  initialState: initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<ResponseCity>) => {
      const cityId = getCityId(action.payload);
      const filteredCities = state.filter((city) => getCityId(city) !== cityId);
      const newFavoriteCities =
        filteredCities.length === state.length ? [...state, action.payload] : filteredCities;

      setStorageItem(STORAGE_ITEM_TYPE.FAVORITE_CITIES, newFavoriteCities);

      return newFavoriteCities;
    },
    removeFavoriteCity: (state, action: PayloadAction<ResponseCity>) => {
      const cityId = getCityId(action.payload);
      const newFavoriteCities = state.filter((city) => getCityId(city) !== cityId);

      setStorageItem(STORAGE_ITEM_TYPE.FAVORITE_CITIES, newFavoriteCities);

      return newFavoriteCities;
    },
    resetFavoriteCities: () => {
      setStorageItem(STORAGE_ITEM_TYPE.FAVORITE_CITIES, []);

      return [];
    },
  },
});

export const { toggleFavoriteCity, removeFavoriteCity, resetFavoriteCities } =
  favoriteCitiesSlice.actions;

export const selectFavoriteCities = (state: RootState) => state.favoriteCities;

export default favoriteCitiesSlice.reducer;
