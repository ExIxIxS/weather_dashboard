import { createApi } from '@reduxjs/toolkit/query/react';
import { weatherBaseQuery } from 'src/api/weatherBaseQuery';
import { UNIT_SYSTEM } from 'src/api/constants';
import type { Position } from 'src/api/types';
import type { ResponseForecast } from 'src/api/forecastSliceAPI/types';

// https://openweathermap.org/forecast5

export const forecastSliceAPI = createApi({
  reducerPath: 'forecastApi',
  baseQuery: weatherBaseQuery(),
  endpoints: (builder) => ({
    getForecast: builder.query<ResponseForecast, Position>({
      query: ({ lat, lon }: Position) => ({
        url: `data/2.5/forecast?lat=${lat}&lon=${lon}&units=${UNIT_SYSTEM}`,
      }),
    }),
  }),
});

export const { useLazyGetForecastQuery } = forecastSliceAPI;
