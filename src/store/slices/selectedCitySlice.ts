import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseCity } from 'src/api/citiesSliceAPI/types';
import { RootState } from 'src/store';
import { getCityId } from 'src/utils/getCityId';

type SelectedCityState = ResponseCity | null;

const initialState: SelectedCityState = null;

const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState: initialState as SelectedCityState,
  reducers: {
    setSelectedCity(currentCity, action: PayloadAction<ResponseCity>) {
      const selectedCity = action.payload;

      return !currentCity || getCityId(currentCity) !== getCityId(selectedCity)
        ? selectedCity
        : currentCity;
    },
    resetSelectedCity() {
      return null;
    },
  },
});

export const { setSelectedCity, resetSelectedCity } = selectedCitySlice.actions;
export const selectSelectedCity = (state: RootState) => state.selectedCity;

export default selectedCitySlice.reducer;
