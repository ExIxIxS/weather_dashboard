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
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
