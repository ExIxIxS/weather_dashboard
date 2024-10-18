import { configureStore } from '@reduxjs/toolkit';
import { citiesSliceAPI } from 'src/api/citiesSliceAPI';
import rootReducer from './reducers';
import { currentWeatherSliceAPI } from 'src/api/currentWeatherSliceAPI';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(citiesSliceAPI.middleware, currentWeatherSliceAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
