import { combineReducers } from '@reduxjs/toolkit';
import { citiesSliceAPI } from 'src/api/citiesSliceAPI';
import selectedCitySliceReducer from 'src/store/slices/selectedCitySlice';

const rootReducer = combineReducers({
  selectedCity: selectedCitySliceReducer,
  [citiesSliceAPI.reducerPath]: citiesSliceAPI.reducer,
});

export default rootReducer;
