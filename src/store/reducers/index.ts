import { combineReducers } from '@reduxjs/toolkit';
import { citiesSliceAPI } from 'src/api/citiesSliceAPI';

const rootReducer = combineReducers({
  [citiesSliceAPI.reducerPath]: citiesSliceAPI.reducer,
});

export default rootReducer;
