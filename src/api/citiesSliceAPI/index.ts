import { createApi } from '@reduxjs/toolkit/query/react';
import { weatherBaseQuery } from 'src/api/weatherBaseQuery';
import { LIMIT_CITIES_AMOUNT } from 'src/api/constants';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

// https://openweathermap.org/api/geocoding-api

export const citiesSliceAPI = createApi({
  reducerPath: 'citiesApi',
  baseQuery: weatherBaseQuery(),
  endpoints: (builder) => ({
    getCitiesByName: builder.query<ResponseCity[], string>({
      query: (cityName: string) => ({
        url: `geo/1.0/direct?q=${cityName}&limit=${LIMIT_CITIES_AMOUNT}`,
      }),
    }),
  }),
});

export const { useLazyGetCitiesByNameQuery } = citiesSliceAPI;
