import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseCity } from 'src/api/citiesSliceAPI/types';
import { RootState } from 'src/store';
import { getCityId } from 'src/utils/getCityId';

type InitialState = ResponseCity[];

const initialState: InitialState = [];

const favoriteCitiesSlice = createSlice({
  name: 'favoriteCities',
  initialState: initialState as InitialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<ResponseCity>) => {
      const cityId = getCityId(action.payload);
      const filteredCities = state.filter((city) => getCityId(city) !== cityId);

      return filteredCities.length === state.length ? [...state, action.payload] : filteredCities;
    },
    removeFavoriteCity: (state, action: PayloadAction<ResponseCity>) => {
      const cityId = getCityId(action.payload);
      return state.filter((city) => getCityId(city) !== cityId);
    },
    resetFavoriteCities: () => {
      return [];
    },
  },
});

export const { toggleFavoriteCity, removeFavoriteCity, resetFavoriteCities } =
  favoriteCitiesSlice.actions;

export const selectFavoriteCities = (state: RootState) => state.favoriteCities;

export default favoriteCitiesSlice.reducer;
