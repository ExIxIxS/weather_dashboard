import { type Dispatch, type SetStateAction } from 'react';
import { type ActiveElement, type ChartEvent } from 'chart.js/dist/types/index';
import { CHART_OPTIONS } from 'src/pages/main/components/CityWeatherInfo/components/Forecast/constants';
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
  setCurrentChartPoint: Dispatch<SetStateAction<ForecastItem | null>>,
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
        border: '2px solid',
        borderColor: '#C26EB4',
        backgroundColor: '#E66FD2',
        pointBackgroundColor: '#E66FD2',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1,
        pointRadius: 5,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false,
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
        ticks: {
          font: {
            family: 'Montserrat',
            size: 12,
            style: 'normal',
            weight: 'normal',
          },
          color: '#072635',
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Montserrat',
            size: 12,
            style: 'normal',
            weight: 'normal',
          },
          color: '#072635',
        },
        type: 'linear',
      },
    },
    onClick: (_: ChartEvent, elements: ActiveElement[]) => {
      if (elements.length) {
        const index = elements[0].index;
        const currentChartPoint = forecastData.chartPoints[index];

        setCurrentChartPoint(currentChartPoint);
      }
    },
  };

  if (forecastData.chartPoints.length) {
    setCurrentChartPoint(forecastData.chartPoints.at(-1) as ForecastItem);
  }

  return { forecastData, chartData, chartOptions };
};
