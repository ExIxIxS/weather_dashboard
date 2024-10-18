import { createApi } from '@reduxjs/toolkit/query/react';
import { LIMIT_CITIES_AMOUNT } from 'src/api/constants';
import { weatherBaseQuery } from 'src/api/weatherBaseQuery';

// https://openweathermap.org/api/geocoding-api
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

export const citiesSliceAPI = createApi({
  reducerPath: 'citiesApi',
  baseQuery: weatherBaseQuery(),
  endpoints: (builder) => ({
    getCitiesByName: builder.query({
      query: (cityName: string) => ({
        url: `geo/1.0/direct?q=${cityName}&limit=${LIMIT_CITIES_AMOUNT}`,
      }),
    }),
  }),
});

export const { useLazyGetCitiesByNameQuery } = citiesSliceAPI;
