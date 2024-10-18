import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const Layout: FC = () => {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <main>
        <Outlet />
      </main>
    </Stack>
  );
};
