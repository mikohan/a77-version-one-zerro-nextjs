import React, { useEffect, useState } from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { containerMaxWidth, REVALIDATE } from '~/config';
import {
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Box,
} from '@material-ui/core';
import ProductPageHead from '~/components/heads/ProductPageHead';

import { ICar, IProduct, IRating } from '~/interfaces';
import { getProduct, getProductsAll } from '~/endpoints/productEndpoint';
import { useRouter } from 'next/router';
import PageHeader from '~/components/product/PageHeader';
import { IBread } from '~/interfaces';
import ResponsivePlayer from '~/components/common/ResponsivePlayer';
import SwiperProduct from '~/components/common/SwiperProduct';
import CatNumber from '~/components/product/productPage/CatNumber';
import PriceBox from '~/components/product/productPage/PriceBox';
import { capitalize } from '~/utils';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import lightGreen from '@material-ui/core/colors/lightGreen';
import parser from 'html-react-parser';
import ProductTabs from '~/components/product/productPage/ProductTabs';
import ProductRating from '~/components/product/productPage/ProductRating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),

      justifyContent: 'center',
      [theme.breakpoints.up('lg')]: {
        maxWidth: '85%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '75%',
      },
    },
    headerContainer: {
      /* background: 'rgba(0,142,129,0.1)', */
      marginBottom: theme.spacing(2),
    },
    gridRow: {
      paddingBottom: theme.spacing(2),
    },
    swipeGrid: {
      paddingRight: theme.spacing(1),
    },
    swiperPaper: {
      height: '100%',
    },
    productHeaderGrid: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },

    descriptionGrid: {
      paddingLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(3),
        paddingLeft: 0,
        paddingRight: theme.spacing(1),
      },
    },
    descriptionPaper: {
      position: 'relative',
      height: '100%',
      padding: theme.spacing(2),
    },
    rightSideGrid: {
      display: 'flex',
      alignItems: 'start',
    },
    under: {
      height: theme.spacing(10),
    },
    productHeader: {
      fontSize: '1.8rem',
      fontWeight: 700,
      [theme.breakpoints.down('md')]: {
        order: 1,
      },
    },
    excerptBox: {
      [theme.breakpoints.down('md')]: {
        order: 3,
      },
    },
    excerptPaper: {
      height: '100%',
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
    excerpt: {
      paddingLeft: theme.spacing(2),
    },
    excerptText: {
      lineHeight: '1.5em',
      maxHeight: '10em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      position: 'relative',
    },
    dl: {
      display: 'flex',
      position: 'relative',
      /* flexWrap: 'wrap', */
      width: '100%',
      alignItems: 'flex-end',
      fontSize: '0.775rem',

      [theme.breakpoints.up('xl')]: {
        fontSize: '0.875rem',
      },
      color: theme.palette.text.disabled,
      '& > dd': {
        width: '49%',
        wordBreak: 'break-word',
      },
      '& > dt': {
        width: '50%',
        '& span': {
          position: 'relative',
          display: 'inline',
          background: theme.palette.background.paper,
        },
        '&:before': {
          content: '""',
          display: 'block',
          width: '60%',
          borderBottom: '1px',
          borderStyle: 'dotted',
          borderColor: theme.palette.action.selected,
          position: 'absolute',
          bottom: '0.2rem',
          left: 0,
        },
      },
    },
    catNumberBox: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        order: 2,
      },
    },
    bottomRow: {
      padding: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        order: 4,
      },
    },
    wrapper: {
      display: 'grid',
      paddingRight: theme.spacing(1),
      gridGap: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr',
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '1fr',
      },
    },
    side: {
      display: 'flex',
    },
    first: {
      background: theme.palette.action.hover,
    },
    second: {
      background: theme.palette.action.selected,
    },
    third: {
      background: 'rgba(0,180,204,0.2)',
    },
    fifth: {
      background: 'rgba(0, 180, 100, 0.2)',
    },
    playerWrapper: {
      position: 'relative',
    },
    reactPlayer: {},
    carBage: {
      position: 'absolute',
      top: theme.spacing(-1),
      left: theme.spacing(4),
      paddingLeft: theme.spacing(1),
      color: () =>
        theme.palette.type === 'light'
          ? theme.palette.background.paper
          : theme.palette.text.primary,
      fontWeight: 500,
      fontSize: '0.8rem',
      zIndex: 0,
      '&::before': {
        content: '""',
        display: 'block',
        width: '100%',
        position: 'absolute',
        zIndex: -1,
        left: theme.spacing(0.5),
        right: theme.spacing(0.5),
        top: 0,
        bottom: 0,
        background: theme.palette.primary.main,
        /* background: */
        /*   theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700], */
        borderRadius: '2px',
        transform: `skewX(-20deg)`,
      },
    },
    analogs: {
      paddingLeft: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        padding: 0,
        marginTop: theme.spacing(2),
      },
    },
    analogPaper: {
      height: '100%',
      padding: theme.spacing(2),
    },
    tabs: {
      paddingTop: theme.spacing(2),
    },
  })
);

interface IProps {
  product: IProduct;
}
interface IGalery {
  original: string;
  thumbnail: string;
}
export default function ProductPage({ product }: IProps) {
  const classes = useStyles();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  const router = useRouter();
  /* if (router.isFallback) { */
  /*   return <div> ... Loading</div>; */
  /* } */
  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: product.name, path: `/product/${product.slug}` },
  ];
  const compability =
    currentCar &&
    product.model.some((car: ICar) => car.slug === currentCar.slug)
      ? true
      : false;
  let ratings: IRating[] = [];
  if (product.rating && product.rating?.length) {
    ratings = product.rating;
  }

  return (
    <React.Fragment>
      <ProductPageHead product={product} />
      <AnimationPage>
        <div className={classes.mainContainer}>
          <Grid container>
            <Grid className={classes.headerContainer} item xs={12}>
              <PageHeader header={product.name} breads={breads} />
            </Grid>
            <Grid className={classes.gridRow} container item xs={12}>
              <Grid className={classes.swipeGrid} item xs={12} md={6}>
                <Paper className={classes.swiperPaper}>
                  <SwiperProduct product={product} />
                </Paper>
              </Grid>
              <Grid className={classes.descriptionGrid} item xs={12} md={6}>
                <Paper className={classes.descriptionPaper}>
                  {compability && (
                    <div className={classes.carBage}>
                      Подходит на {currentCar?.model}
                    </div>
                  )}
                  <Grid className={classes.rightSideGrid} container>
                    <Grid className={classes.productHeaderGrid} item xs={12}>
                      <Typography
                        className={classes.productHeader}
                        variant="h1"
                      >
                        {`${product.name} ${capitalize(
                          product.model[0].make.name
                        )} ${product.model[0].model}`}
                      </Typography>
                      <ProductRating ratings={ratings} />
                    </Grid>
                    <Grid className={classes.excerptBox} item xs={12} lg={6}>
                      {product.description && (
                        <Grid className={classes.excerpt} item xs={12} lg={12}>
                          <Box className={classes.excerptText}>
                            {parser(product.description)}
                          </Box>
                        </Grid>
                      )}
                      <Box className={classes.excerptPaper}>
                        {product.attributes &&
                          product.attributes.map((attr: any, i: number) => (
                            <dl key={i} className={classes.dl}>
                              <dt>
                                <span>{attr.name}</span>
                              </dt>
                              <dd>
                                <span>{attr.value}</span>
                              </dd>
                            </dl>
                          ))}
                      </Box>
                    </Grid>
                    <Grid
                      className={classes.catNumberBox}
                      container
                      item
                      xs={12}
                      lg={6}
                    >
                      <Box>
                        <PriceBox product={product} />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid item className={classes.under} xs={12}></Grid>
            <Grid container item>
              <Grid className={classes.wrapper} item xs={12} md={6}>
                <Paper>
                  {product.video &&
                    product.video.map((vid: string) => (
                      <div key={vid} className={classes.third}>
                        <ResponsivePlayer videoUrl={vid} />
                      </div>
                    ))}
                </Paper>
              </Grid>
              <Grid className={classes.analogs} item xs={12} md={6}>
                <Paper className={classes.analogPaper}>
                  <Typography variant="h6">Аналоги</Typography>
                  <Box>{parser(product.description)}</Box>
                </Paper>
                <div></div>
              </Grid>
              <Grid item className={classes.tabs} xs={12}>
                <Paper>{/* <ProductTabs product={product} /> */}</Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params!;

  const product: IProduct = await getProduct(slug as string);

  return {
    revalidate: REVALIDATE,
    props: {
      product,
    },
  };
};

interface IPaths {
  params: {
    slug: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const promise = await getProductsAll();
  const prods = promise.hits.hits;
  let paths: IPaths[] = [];
  for (let prod of prods) {
    if (prod._source.slug) {
      paths.push({ params: { slug: prod._source.slug } });
    } else {
      console.log('Something wrong with slug in product');
    }
  }

  return {
    fallback: false,
    paths: paths,
  };
};