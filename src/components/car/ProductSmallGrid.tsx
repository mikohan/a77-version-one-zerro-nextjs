import React from 'react';
import Link from 'next/link';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Image from 'next/image';
import { imageServerUrl } from '~/config';
import url from '~/services/url';
import { IProduct } from '~/interfaces';
import { part64 } from '~/services/base64';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`,
      gridGap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    image: {
      objectFit: 'cover',
      borderRadus: '5px',
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
    paper: {
      borderRadius: '5px 5px 0 0',
      '& img': {
        borderRadius: '5px 5px 0 0',
      },
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
            <Paper className={classes.paper} key={product.slug}>
              <Link href={url.product(product.slug)}>
                <a>
                  <Box className={classes.underImageBox}>
                    <div className={classes.paper}>
                      <Image
                        className={classes.image}
                        src={imgSrc as string}
                        width={200}
                        height={170}
                        layout="responsive"
                        blurDataURL={part64}
                        placeholder="blur"
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
