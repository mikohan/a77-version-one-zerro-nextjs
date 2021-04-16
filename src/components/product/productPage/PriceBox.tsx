import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, Chip, Button, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: theme.spacing(20),
      border: '1px solid blue',
    },
    paperOne: {
      height: theme.spacing(20),
    },
    firstRow: {},
    price: {
      padding: theme.spacing(2),
    },
    priceSide: {
      padding: theme.spacing(2),
    },
  })
);

const PriceBox = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid className={classes.firstRow} container item xs={12}>
          <Box className={classes.price}>
            <Typography variant="h4">R 5967</Typography>
          </Box>
          <Box className={classes.priceSide}>
            <Typography variant="body2">Some content</Typography>
          </Box>
        </Grid>
        <Grid className={classes.secondRow} container item>
          <Button variant="contained" color="primary">
            Add to CART
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PriceBox;
