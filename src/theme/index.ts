import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

export const THEME_OPTIONS: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#f3e3e3',
      light: '#2d2d2d',
    },
    secondary: {
      main: '#dc9c78',
      contrastText: '#f7e1e1',
    },
    success: {
      main: '#76bd76',
    },
    info: {
      main: '#508daf',
    },
    warning: {
      main: '#ed6c02',
      contrastText: 'rgba(234,223,223,0.87)',
    },
    error: {
      main: '#df4f59',
    },
    background: {
      default: '#2d2d2d',
      paper: '#58595e',
    },
    divider: 'rgba(214,210,210,0.12)',
    text: {
      primary: '#f1f5f6',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    subtitle1: {
      fontFamily: 'Lora',
    },
    h1: {
      fontFamily: 'Lato',
    },
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          opacity: 0.8,
          background:
            'linear-gradient(160deg, rgba(60,59,65,0.7) 37%, rgba(181,185,184,0.7) 100%);',
          border: 0,
          borderRadius: 3,
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
  },
};

const theme = createTheme({
  cssVariables: true,
  ...THEME_OPTIONS,
});

export default theme;
