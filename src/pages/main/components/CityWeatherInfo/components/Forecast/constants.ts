import type { SelectOption } from 'src/pages/main/components/CityWeatherInfo/components/Forecast/types';

export enum CHART_OPTIONS {
  TEMP = 'temp',
  PRESSURE = 'pressure',
  HUMIDITY = 'humidity',
  WIND_SPEED = 'windSpeed',
}

export const CHART_SELECT_OPTIONS: SelectOption<CHART_OPTIONS>[] = [
  {
    value: CHART_OPTIONS.TEMP,
    label: `Temperature (°C)`,
  },
  {
    value: CHART_OPTIONS.PRESSURE,
    label: `Pressure (hPa)`,
  },
  {
    value: CHART_OPTIONS.HUMIDITY,
    label: `Humidity (%)`,
  },
  {
    value: CHART_OPTIONS.WIND_SPEED,
    label: `Wind speed (m/s)`,
  },
];
