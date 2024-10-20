import { Clouds, MainWeatherInfo, Position, Rain, Weather, Wind } from 'src/api/types';

type Sys = {
  pod: string;
};

export type ForecastItem = {
  dt: number;
  main: MainWeatherInfo;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain: Rain;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
};

type City = {
  id: number;
  name: string;
  coord: Position;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type ResponseForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
};
