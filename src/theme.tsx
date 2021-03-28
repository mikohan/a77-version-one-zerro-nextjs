import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

// Create a theme instance.
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2000,
    },
  },
  palette: {
    type: 'light',
  },
  mixins: {
    toolbar: {
      tab: {
        color: 'inherit',
      },
    },
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
  },
});

// Complitely owerrides properties
theme.typography.h1 = {
  [theme.breakpoints.down('xl')]: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 300,
    fontSize: '1.6rem',
    lineHeight: 1.167,
    letterSpacing: '-0.01562em',
  },
  [theme.breakpoints.up('xxl')]: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 300,
    fontSize: '1.9rem',
    lineHeight: 1.167,
    letterSpacing: '-0.01562em',
  },
};
theme.typography.body1 = {
  [theme.breakpoints.up('xxl')]: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif"`,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  [theme.breakpoints.down('xl')]: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif"`,
    fontWeight: 400,
    fontSize: '1.1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
};

theme.typography.body2 = {
  [theme.breakpoints.down('xl')]: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif"`,
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  [theme.breakpoints.up('xxl')]: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif"`,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.01071em',
  },
};

export default theme;
