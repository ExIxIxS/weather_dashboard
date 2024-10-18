export type ResponseCity = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
};
