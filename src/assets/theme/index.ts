import { PaletteMode, createTheme } from '@mui/material';
import { amber, blue, grey } from '@mui/material/colors';

export const colors = {
  primary: '#2bd17f',
  error: '#eb5757',
  background: '#093545',
  input: '#224958',
  card: '#082c38',
  text: '#ffffff',
};

export const themeStyle = (mode: PaletteMode) =>
  createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {},
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            color: colors.text,
            fontFamily: 'Montserrat',
            textTransform: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            borderWidth: 0,
            background: colors.input,
            color: colors.text,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: 'Montserrat',
            borderRadius: 10,
            borderWidth: 0,
            background: colors.input,
            color: colors.text,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            borderWidth: 0,
            background: colors.input,
            color: colors.text,
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: colors.text,
            fontFamily: 'Montserrat',
          },
        },
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: '#3D4453',
            },
            divider: blue[200],
            text: {
              primary: grey[50],
              secondary: grey[50],
            },
          }
        : {
            primary: amber,
            divider: amber[200],
            text: {
              primary: amber[900],
              secondary: amber[800],
            },
          }),
    },
  });
