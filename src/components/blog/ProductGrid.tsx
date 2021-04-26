import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IProduct } from '~/interfaces/product';
import { Hidden, Box, Grid, TextField } from '@material-ui/core';
import ProductCard from './ProductCArdSmall';

interface IProps {
  products: IProduct[];
}

export default function ShopGrid({ products }: IProps) {
  // Working on capability parts

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cards: {
        minWidth: '90%',
        margin: '0 auto',
        padding: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(150px, 1fr))`,
        gridGap: theme.spacing(4), // padding for cards in the content area
        marginBottom: theme.spacing(5),
      },
    })
  );

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container>
        <div className={classes.cards}>
          {products.map((product: IProduct) => (
            <ProductCard product={product} />
          ))}
        </div>
      </Grid>
    </React.Fragment>
  );
}
