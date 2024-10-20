import { ResponseCity } from 'src/api/citiesSliceAPI/types';

const isRecordOfStrings = (obj: unknown): obj is Record<string, string> =>
  typeof obj !== 'object' || obj === null
    ? false
    : Object.values(obj).every((value) => typeof value === 'string');

export const isResponseCity = (obj: unknown): obj is ResponseCity =>
  !!obj &&
  typeof obj === 'object' &&
  typeof (obj as ResponseCity).name === 'string' &&
  typeof (obj as ResponseCity).country === 'string' &&
  (typeof (obj as ResponseCity).state === 'undefined' ||
    typeof (obj as ResponseCity).state === 'string') &&
  (typeof (obj as ResponseCity).local_names === 'undefined' ||
    isRecordOfStrings((obj as ResponseCity).local_names)) &&
  typeof (obj as ResponseCity).lat === 'number' &&
  typeof (obj as ResponseCity).lon === 'number';
