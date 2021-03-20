import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
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
    fontSize: 13,
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
