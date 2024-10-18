import { configureStore } from '@reduxjs/toolkit';
import { citiesSliceAPI } from 'src/api/citiesSliceAPI';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(citiesSliceAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
