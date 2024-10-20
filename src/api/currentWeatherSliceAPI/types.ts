import { Clouds, MainWeatherInfo, Position, Rain, Weather, Wind } from 'src/api/types';

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type ResponseCurrentWeather = {
  coord: Position;
  weather: Weather[];
  base: string;
  main: MainWeatherInfo;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
