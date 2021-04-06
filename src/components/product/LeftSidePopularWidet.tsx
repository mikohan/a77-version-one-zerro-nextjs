import React, { ReactNode } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { IProduct } from '~/interfaces';
import ProductCardForSide from '~/components/product/ProductCardForSide';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      /* paddingLeft: theme.spacing(2), */
      /* paddingRight: theme.spacing(2), */
      /* border: '1px solid blue', */
    },
    whiteBox: {
      padding: theme.spacing(2),
      width: '100%',
      background: theme.palette.background.paper,
    },
    title: {
      marginBottom: theme.spacing(3),
    },
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
      <Grid item xs={12}>
        <Typography className={classes.title} variant="body1">
          Популярные Запчасти
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {popularProducts.map((product: IProduct, i: number) => (
          <ProductCardForSide key={product.id} product={product} />
        ))}
      </Grid>
    </Grid>
  );
}
