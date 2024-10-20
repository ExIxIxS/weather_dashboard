import {
  CHART_LABEL_STYLE_PARAMS,
  CHART_OPTIONS,
  GRID_TICK_PARAMS,
} from 'src/pages/main/components/CityWeatherInfo/components/Forecast/constants';
import type { ForecastItem, ResponseForecast } from 'src/api/forecastSliceAPI/types';

const getForecastData = (forecast?: ResponseForecast, length: number = Infinity) => {
  const initialResult = {
    dates: [] as string[],
    [CHART_OPTIONS.TEMP]: [] as number[],
    [CHART_OPTIONS.PRESSURE]: [] as number[],
    [CHART_OPTIONS.HUMIDITY]: [] as number[],
    [CHART_OPTIONS.WIND_SPEED]: [] as number[],
    chartPoints: [] as ForecastItem[],
  };

  if (!forecast) return initialResult;

  const { dates, temp, pressure, humidity, windSpeed, chartPoints } = forecast.list.reduce(
    (result, forecastRecord) => {
      const {
        dt_txt,
        main: { temp, pressure, humidity },
        wind: { speed: windSpeed },
      } = forecastRecord;

      result.dates.push(dt_txt.split(' ').at(-1)?.slice(0, 5) ?? '');
      result.temp.push(temp);
      result.pressure.push(pressure);
      result.humidity.push(humidity);
      result.windSpeed.push(windSpeed);
      result.chartPoints.push(forecastRecord);

      return result;
    },
    { ...initialResult }
  );

  return dates.length > length
    ? {
        dates: dates.slice(-length),
        temp: temp.slice(-length),
        pressure: pressure.slice(-length),
        humidity: humidity.slice(-length),
        windSpeed: windSpeed.slice(-length),
        chartPoints: chartPoints.slice(-length),
      }
    : { dates, temp, pressure, humidity, windSpeed, chartPoints };
};

export const getChartData = (
  chartOption: CHART_OPTIONS | undefined = CHART_OPTIONS.TEMP,
  forecast?: ResponseForecast,
  period?: number
) => {
  const forecastData = getForecastData(forecast, period);

  const chartData = {
    labels: forecastData.dates,
    datasets: [
      {
        label: chartOption,
        data: forecastData[chartOption],
        tension: 0.3,
        fill: false,
        ...CHART_LABEL_STYLE_PARAMS,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Blood Pressure',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: GRID_TICK_PARAMS,
      },
      y: {
        ticks: GRID_TICK_PARAMS,
        type: 'linear',
      },
    },
  };

  return { forecastData, chartData, chartOptions };
};
