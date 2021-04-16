import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Paper,
  Grid,
  Chip,
  Button,
  Typography,
  Box,
  TextField,
  useTheme,
} from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      border: '1px solid blue',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    paperOne: {
      height: theme.spacing(20),
    },
    firstRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      justifyContent: 'space-around',
      border: '1px solid pink',
      alignItems: 'center',
    },
    formBox: {
      width: '30%',
    },
    chip: {
      background: () =>
        theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700],
      borderColor: () =>
        theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700],
    },
    inStock: {
      color: () =>
        theme.palette.type === 'light' ? lightGreen[700] : lightGreen[100],
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
          <Chip
            className={classes.chip}
            label={
              <Typography className={classes.inStock} variant="body2">
                В наличии
              </Typography>
            }
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
      <Box className={classes.middle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eveniet
        ut voluptatem voluptatum voluptatibus, fugit tempore odio eligendi
        laudantium numquam. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Dolore eveniet ut voluptatem voluptatum voluptatibus, fugit
        tempore odio eligendi laudantium numquam.
      </Box>
      <Box className={classes.secondRow}>
        <Box className={classes.formBox}>
          <TextField
            style={{ width: '100%' }}
            type="number"
            label="Кол-во"
            id="filled-size-small"
            defaultValue="Small"
            variant="outlined"
            size="small"
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary">
            Add to CART
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PriceBox;
