import THEME from 'src/theme';
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

export const GRID_TICK_PARAMS = {
  font: {
    family: THEME.typography.fontFamily,
    size: 12,
    style: 'normal',
    weight: 'normal',
  },
  color: THEME.palette.text.primary,
};

export const CHART_LABEL_STYLE_PARAMS = {
  border: '2px solid',
  borderColor: THEME.palette.secondary.main,
  pointBackgroundColor: THEME.palette.warning.dark,
  pointBorderColor: THEME.palette.text.primary,
  pointBorderWidth: 1,
  pointRadius: 5,
  pointHoverRadius: 6,
};
