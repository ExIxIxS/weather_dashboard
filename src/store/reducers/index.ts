import { combineReducers } from '@reduxjs/toolkit';
import { citiesSliceAPI } from 'src/api/citiesSliceAPI';
import { currentWeatherSliceAPI } from 'src/api/currentWeatherSliceAPI';
import { forecastSliceAPI } from 'src/api/forecastSliceAPI';
import selectedCitySliceReducer from 'src/store/slices/selectedCitySlice';
import favoriteCitiesReducer from 'src/store/slices/favoriteCitiesSlice';

const rootReducer = combineReducers({
  selectedCity: selectedCitySliceReducer,
  favoriteCities: favoriteCitiesReducer,
  [citiesSliceAPI.reducerPath]: citiesSliceAPI.reducer,
  [currentWeatherSliceAPI.reducerPath]: currentWeatherSliceAPI.reducer,
  [forecastSliceAPI.reducerPath]: forecastSliceAPI.reducer,
});

export default rootReducer;
