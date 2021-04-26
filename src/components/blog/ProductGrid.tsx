import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import { Hidden, Box, Grid, TextField } from '@material-ui/core';
import ProductCard from './ProductCArdSmall';

interface IProps {
  products: IProductElasticHitsSecond[];
}

export default function ShopGrid({ products }: IProps) {
  // Working on capability parts

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cards: {
        margin: '0 auto',
        padding: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
        gridGap: theme.spacing(4), // padding for cards in the content area
        marginBottom: theme.spacing(5),
      },
    })
  );

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container>
        <Grid item container xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
