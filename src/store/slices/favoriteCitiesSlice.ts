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
    addFavoriteCity: (state, action: PayloadAction<ResponseCity>) => {
      const cityId = getCityId(action.payload);

      if (state.every((city) => getCityId(city) !== cityId)) {
        state.push(action.payload);
      }
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

export const { addFavoriteCity, removeFavoriteCity, resetFavoriteCities } =
  favoriteCitiesSlice.actions;

export const selectFavoriteCities = (state: RootState) => state.favoriteCities;

export default favoriteCitiesSlice.reducer;
