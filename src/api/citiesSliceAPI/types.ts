import { Position } from 'src/api/types';

export type ResponseCity = {
  name: string;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
} & Position;
