import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    xxl: true;
  }
}

// Create a theme instance.
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xxl: 2560,
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
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
  },
});

export default theme;
