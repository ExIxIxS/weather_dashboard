import { type ReactNode, type FC } from 'react';
import Alert from '@mui/material/Alert';

type TProps = {
  children: ReactNode;
};

export const OutlinedAlert: FC<TProps> = ({ children }) => {
  return (
    <Alert severity="error" variant="outlined">
      {children}
    </Alert>
  );
};
