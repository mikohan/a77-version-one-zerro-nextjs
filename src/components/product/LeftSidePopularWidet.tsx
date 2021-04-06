import React, { ReactNode } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { IProduct } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      /* border: '1px solid blue', */
    },
    whiteBox: {
      padding: theme.spacing(2),
      width: '100%',
      background: theme.palette.background.paper,
    },
    children: {},
  })
);

interface IProps {
  popularProducts: IProduct[];
}

export default function LeftSidePopularWidget({
  popularProducts,
}: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Box className={classes.whiteBox}>
        <Grid item xs={12}>
          <Typography variant="h6">Popular Products</Typography>
        </Grid>
        <Grid item xs={12}>
          {popularProducts.map((product: IProduct, i: number) => (
            <pre key={product.slug}>{JSON.stringify(product, null, 2)}</pre>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
