import type { ResponseError } from 'src/api/types';

export const isResponseError = (err: unknown): err is ResponseError => {
  return (
    !!err &&
    typeof err === 'object' &&
    err !== null &&
    typeof (err as ResponseError).message === 'string' &&
    (typeof (err as ResponseError).status === 'undefined' ||
      typeof (err as ResponseError).status === 'number')
  );
};
