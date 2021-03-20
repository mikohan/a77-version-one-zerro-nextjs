import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    fontSize: 12,
    h1: {
      fontSize: 17,
    },
  },
});

export default theme;
