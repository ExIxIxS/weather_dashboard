import axios from 'axios';
import { BASE_URL_WEATHER_API, URL_API_KEY } from 'src/api/constants';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { METHODS } from 'src/api/constants/http';
import { ResponseError } from 'src/api/types';

export const weatherBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: BASE_URL_WEATHER_API }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = METHODS.GET, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url + URL_API_KEY,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          message: (err.response?.data as ResponseError)?.message || err.message,
        },
      };
    }
  };
