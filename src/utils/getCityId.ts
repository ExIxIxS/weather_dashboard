import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

export const getCityId = ({ name, country, lat, lon }: ResponseCity) =>
  `${name}-${country}:${lat}-${lon}`;
