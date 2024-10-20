import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AUTHOR_LINK } from 'src/components/Layout/constants';

export const Layout: FC = () => {
  return (
    <Box>
      <Box
        component="main"
        sx={{ mx: 'auto', width: { xs: 300, sm: 500, md: 800, lg: 1100, xl: 1400 } }}
      >
        <Outlet />
      </Box>
      <Stack
        component="footer"
        sx={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      >
        <Link href={AUTHOR_LINK} target="_blank" underline="none" sx={{ p: 2, mb: 4 }}>
          <Typography variant="body1" component="span">
            © 2024 Denis Bondarenko. All rights reserved
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};
