import {Current} from '../types/types';

export const weatherSubInfo = (
  data: Current,
): Array<{label: string; message: any}> => [
  {
    label: 'Sensação térmica',
    message: data?.feelslike_c,
  },
  {
    label: 'UV',
    message: data?.uv,
  },
  {
    label: 'Umidade do ar',
    message: data?.humidity,
  },
  {
    label: 'Precipitação',
    message: data?.precip_mm,
  },
];

export const weatherDetails = (
  data: Current,
): Array<{label: string; message: any}> => [
  {
    label: 'Fahrenheit',
    message: data?.temp_f,
  },
  {
    label: 'Sensação térmica',
    message: data?.feelslike_c,
  },
  {
    label: 'UV',
    message: data?.uv,
  },
  {
    label: 'Umidade do ar',
    message: data?.humidity,
  },
  {
    label: 'Precipitação',
    message: data?.precip_mm,
  },
  {
    label: 'Vel. do vento (km/h)',
    message: data?.wind_kph,
  },
  {
    label: 'Direção do vento',
    message: data?.wind_degree,
  },
  {
    label: 'Pressão atm. (milibares)',
    message: data?.pressure_mb,
  },
  {
    label: 'Pressão atm. (polegadas)',
    message: data?.pressure_in,
  },
];
