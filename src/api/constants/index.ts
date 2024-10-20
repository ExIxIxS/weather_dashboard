const API_KEY = import.meta.env.VITE_API_KEY ?? '';

export const URL_API_KEY = `&appid=${API_KEY}`;
export const BASE_URL_WEATHER_API = 'https://api.openweathermap.org/';
export const UNIT_SYSTEM = 'metric';
export const LIMIT_CITIES_AMOUNT = 5;
