import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseCity } from 'src/api/citiesSliceAPI/types';
import { RootState } from 'src/store';

type SelectedCityState = ResponseCity | null;

const initialState: SelectedCityState = null;

const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState: initialState as SelectedCityState,
  reducers: {
    setSelectedCity(_, action: PayloadAction<ResponseCity>) {
      return action.payload;
    },
    resetSelectedCity() {
      return null;
    },
  },
});

export const { setSelectedCity } = selectedCitySlice.actions;
export const selectSelectedCity = (state: RootState) => state.selectedCity;

export default selectedCitySlice.reducer;
