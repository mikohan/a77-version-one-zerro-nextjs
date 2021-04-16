import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Chip,
  Button,
  Typography,
  Box,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: theme.spacing(20),
      border: '1px solid blue',
      display: 'flex',
      flexDirection: 'column',
    },
    paperOne: {
      height: theme.spacing(20),
    },
    firstRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    price: {
      padding: theme.spacing(2),
    },
    priceSide: {
      padding: theme.spacing(2),
    },
    middle: {
      flexGrow: 1,
    },
    secondRow: {
      display: 'flex',
      justifyContent: 'center',
      border: '1px solid pink',
    },
  })
);

const PriceBox = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box className={classes.firstRow}>
        <Box className={classes.price}>
          <Typography variant="h4">R 5967</Typography>
        </Box>
        <Box className={classes.priceSide}>
          <Typography variant="body2">Some content</Typography>
        </Box>
      </Box>
      <Box className={classes.middle}>content</Box>
      <Box className={classes.secondRow}>
        <Box>
          <TextField
            label="Size"
            id="filled-size-small"
            defaultValue="Small"
            variant="filled"
            size="small"
          />
        </Box>
        <Button variant="contained" color="primary">
          Add to CART
        </Button>
      </Box>
    </div>
  );
};

export default PriceBox;
