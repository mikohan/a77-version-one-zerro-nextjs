import {
  IFilter,
  IProductElasticHitsFirst,
  IProduct,
  ICategory,
  ICar,
} from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import PageHeader from '~/components/product/PageHeader';
import LeftSideBar from '~/components/product/LeftSideBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FilterWidget from '~/components/product/FilterWidget';
import { Box, Paper, Typography } from '@material-ui/core';
import LeftSidePopularWidget from '~/components/product/LeftSidePopularWidet';
import CategoryBlock from '~/components/car/CategoryBlock';
import { capitalize } from '~/utils';
import Image from 'next/image';
import { imageServerUrl } from '~/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    smallBox: {
      display: 'flex',
      flexDirection: 'column',
      width: 120,
      height: 200,
      fontSize: '0.7rem',
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    textBox: {
      paddingLeft: theme.spacing(0.5),
      flexGrow: 1,
      overflow: 'hidden',
      color: theme.palette.text.secondary,
    },
    brand: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(0.2),
      textTransform: 'uppercase',
    },
    imageContainer: {
      height: 120,
    },
    image: {
      objectFit: 'cover',
    },
    price: {
      fontWeight: 500,
      color:
        theme.palette.type === 'light' ? theme.palette.primary.main : 'inherit',
    },
  })
);

interface IProps {
  products: IProduct[];
}
export default function ModelShopList(props: IProps) {
  const { products } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container>
        <Grid className={classes.contentContainer} item xs={12}>
          {products.map((product: IProduct) => {
            const imgSrc = product.images.length
              ? `${imageServerUrl}${product.images[0].img150}`
              : '/images/local/defaultParts245.png';

            return (
              <Paper key={product.id} className={classes.smallBox}>
                <div className={classes.imageContainer}>
                  <Image
                    className={classes.image}
                    src={imgSrc as string}
                    width={120}
                    height={120}
                  />
                </div>
                <div className={classes.textBox}>{product.name}</div>
                <div className={classes.brand}>
                  <div className={classes.price}>
                    &#8381;{' '}
                    {product.stocks && product.stocks.length
                      ? product.stocks[0].price
                      : 'Звоните'}
                  </div>

                  <div>{product.brand.name}</div>
                </div>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
