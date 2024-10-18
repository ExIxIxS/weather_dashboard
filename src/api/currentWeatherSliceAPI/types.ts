import { Position } from 'src/api/types';

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainWeatherInfo = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Rain = {
  '1h': number;
};

type Clouds = {
  all: number;
};

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
