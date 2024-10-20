import { useMemo, useState, type FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { OutlinedAlert } from 'src/components/OutlinedAlert';
import { getChartData } from 'src/pages/main/components/CityWeatherInfo/components/Forecast/utils';
import {
  CHART_OPTIONS,
  CHART_SELECT_OPTIONS,
} from 'src/pages/main/components/CityWeatherInfo/components/Forecast/constants';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';
import type { ResponseForecast } from 'src/api/forecastSliceAPI/types';

type TProps = {
  city: ResponseCity | null;
  forecast?: ResponseForecast;
  isFetching: boolean;
  isError: boolean;
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export const Forecast: FC<TProps> = ({ city, forecast, isFetching, isError }) => {
  const [selectOption, setSelectOption] = useState(CHART_SELECT_OPTIONS.at(0));

  const handleSetCurrentChartPoint = () => console.log('click point'); // refactor

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const newValue = e.target.value as CHART_OPTIONS;

    const selectOption = CHART_SELECT_OPTIONS.find((option) => option.value === newValue);

    if (selectOption) {
      setSelectOption(selectOption);
    }
  };

  const { chartData, chartOptions } = useMemo(
    () => getChartData(handleSetCurrentChartPoint, selectOption?.value, forecast),
    [forecast, handleSetCurrentChartPoint, selectOption]
  );

  return (
    <Stack sx={{ overflow: 'auto', p: { xs: 1, sm: 2, md: 4, xl: 8 }, zIndex: 2 }}>
      {city && (
        <Box sx={{ minHeight: 300 }}>
          {isError && <OutlinedAlert>Data fetching error</OutlinedAlert>}
          {isFetching && <CircularProgress color="inherit" sx={{ my: 4 }} />}
          {!isFetching && !isError && forecast && (
            <>
              <Typography variant="h3" component="h2" sx={{ mb: 4 }}>
                5 days forecast
              </Typography>
              <Box sx={{ width: 700, minHeight: 400 }}>
                <Line data={chartData} options={chartOptions as never} />
              </Box>
              <FormControl fullWidth>
                <Select
                  id="chart-options-select"
                  value={selectOption?.value}
                  label={selectOption?.label}
                  onChange={handleChangeSelect}
                  variant="standard"
                >
                  {CHART_SELECT_OPTIONS.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Box>
      )}
    </Stack>
  );
};
