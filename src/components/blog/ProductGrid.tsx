import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { IProduct } from '~/interfaces/product';
import ProductCard from './ProductCardSmall';

interface IProps {
  products: IProduct[];
}

export default function ShopGrid({ products }: IProps) {
  // Working on capability parts

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cards: {
        minWidth: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(150px, 1fr))`,
        gridGap: theme.spacing(2), // padding for cards in the content area
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
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Grid>
    </React.Fragment>
  );
}

