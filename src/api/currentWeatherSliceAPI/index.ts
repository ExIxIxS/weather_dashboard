import { createApi } from '@reduxjs/toolkit/query/react';
import { weatherBaseQuery } from 'src/api/weatherBaseQuery';
import type { Position } from 'src/api/types';
import type { ResponseCurrentWeather } from 'src/api/currentWeatherSliceAPI/types';

// https://openweathermap.org/current

export const currentWeatherSliceAPI = createApi({
  reducerPath: 'currentWeatherApi',
  baseQuery: weatherBaseQuery(),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<ResponseCurrentWeather, Position>({
      query: ({ lat, lon }: Position) => ({
        url: `data/2.5/weather?lat=${lat}&lon=${lon}`,
      }),
    }),
  }),
});

export const { useLazyGetCurrentWeatherQuery } = currentWeatherSliceAPI;
