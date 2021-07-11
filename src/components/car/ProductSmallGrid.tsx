import { IProduct } from '~/interfaces';
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import Image from 'next/image';
import { imageServerUrl } from '~/config';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: `repeat(6, minmax(15%, 1fr))`,
      gridGap: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    image: {
      objectFit: 'cover',
    },
    underImageBox: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    name: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontWeight: 600,
    },
    brandPrice: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItes: 'center',
      padding: theme.spacing(1),
    },
    price: {
      fontWeight: 500,
      color:
        theme.palette.type === 'light' ? theme.palette.primary.main : 'inherit',
    },
    brand: {
      textTransform: 'uppercase',
    },
  })
);

interface IProps {
  products: IProduct[];
}
export default function ModelShopList(props: IProps) {
  const { products } = props;
  const classes = useStyles();
  const shrinkedProducts = products.slice(0, 12);

  return (
    <React.Fragment>
      <Grid className={classes.container} container>
        {shrinkedProducts.map((product: IProduct) => {
          const imgSrc = product.images.length
            ? `${imageServerUrl}${product.images[0].img150}`
            : '/images/local/defaultParts245.png';

          return (
            <Paper key={product.slug}>
              <Link href={url.product(product.slug)}>
                <a>
                  <Box className={classes.underImageBox}>
                    <div>
                      <Image
                        className={classes.image}
                        src={imgSrc as string}
                        width={200}
                        height={170}
                        layout="responsive"
                      />
                    </div>
                    <div className={classes.name}>{product.name}</div>
                    <div className={classes.brandPrice}>
                      <div className={classes.price}>
                        &#8381;{' '}
                        {product.stocks && product.stocks.length
                          ? product.stocks[0].price
                          : 'Звоните'}
                      </div>

                      <div className={classes.brand}>{product.brand.name}</div>
                    </div>
                  </Box>
                </a>
              </Link>
            </Paper>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
