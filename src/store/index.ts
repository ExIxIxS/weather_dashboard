import { configureStore } from '@reduxjs/toolkit';
import { citiesSliceAPI } from 'src/api/citiesSliceAPI';
import { currentWeatherSliceAPI } from 'src/api/currentWeatherSliceAPI';
import { forecastSliceAPI } from 'src/api/forecastSliceAPI';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      citiesSliceAPI.middleware,
      currentWeatherSliceAPI.middleware,
      forecastSliceAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
