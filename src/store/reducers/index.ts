import { combineReducers } from '@reduxjs/toolkit';
import { citiesSliceAPI } from 'src/api/citiesSliceAPI';
import { currentWeatherSliceAPI } from 'src/api/currentWeatherSliceAPI';
import selectedCitySliceReducer from 'src/store/slices/selectedCitySlice';

const rootReducer = combineReducers({
  selectedCity: selectedCitySliceReducer,
  [citiesSliceAPI.reducerPath]: citiesSliceAPI.reducer,
  [currentWeatherSliceAPI.reducerPath]: currentWeatherSliceAPI.reducer,
});

export default rootReducer;
