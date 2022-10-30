import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0635c9'
    },
    secondary: {
      main: '#1ae5be'
    },
    text: {
      primary: '#707070',
      secondary: '#9B9B9B',
      disabled: '#D3D3D3'
    },
    error: {
      main: '#cf4a4d'
    },
    warning: {
      main: '#FCA600'
    },
    success: {
      main: '#00D34D'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F0F0F0',
      200: '#D7D9DD',
      300: '#C4C4C4',
      400: '#9B9B9B'
    }
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 14
  },
  shape: {
    borderRadius: 3
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#B4B4C1',
          backgroundColor: '#FDFDFF',
          borderRadius: '15px',
          zIndex: '-1'
        },
        input: {
          borderRadius: '15px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      },
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            color: 'white'
          }
        }
      ]
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 39px rgba(0, 0, 0, 0.05)'
        }
      }
    }
  }
});

export default theme;
