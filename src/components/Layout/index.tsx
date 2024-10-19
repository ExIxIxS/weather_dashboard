import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

export const Layout: FC = () => {
  return (
    <Box>
      <Box
        component="main"
        sx={{ mx: 'auto', width: { xs: 300, sm: 500, md: 800, lg: 1100, xl: 1400 } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
