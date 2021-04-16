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

import { ICar, IProduct } from '~/interfaces';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      height: '100%',
    },
    under: {
      border: '1px solid orange',
      height: theme.spacing(10),
    },
    productHeader: {
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
      padding: theme.spacing(2),
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
      border: '1px solid teal',
      [theme.breakpoints.down('md')]: {
        order: 4,
      },
    },
    wrapper: {
      display: 'grid',
      gridGap: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '4fr 3fr',
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '6fr 6fr',
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
      left: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      color: () =>
        theme.palette.type === 'light'
          ? theme.palette.background.paper
          : theme.palette.text.primary,
      fontWeight: 500,
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
  return (
    <React.Fragment>
      <ProductPageHead product={product} />
      <AnimationPage>
        <Container maxWidth="xl">
          <Grid container>
            <Grid className={classes.headerContainer} item xs={12}>
              <PageHeader header={product.name} breads={breads} />
            </Grid>
            <Grid className={classes.gridRow} container item xs={12}>
              <Grid className={classes.swipeGrid} item xs={12} md={6}>
                <Paper>
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
                    <Grid
                      className={classes.productHeaderGrid}
                      style={{ border: '1px solid teal' }}
                      item
                      xs={12}
                    >
                      <Typography
                        className={classes.productHeader}
                        variant="h1"
                      >
                        {`${product.name} ${capitalize(
                          product.model[0].make.name
                        )} ${product.model[0].model}`}
                      </Typography>
                    </Grid>
                    <Grid className={classes.excerptBox} item xs={12} lg={6}>
                      <Box className={classes.excerptPaper}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque alias, nemo dolore quibusdam praesentium
                        voluptates provident reprehenderit. Sequi, placeat? Eius
                        placeat repellat in autem! Deleniti dignissimos eveniet
                        explicabo aut, animi, dolorum aspernatur sunt laborum
                        delectus doloribus eaque velit, ducimus nisi.
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
                        <PriceBox />
                      </Box>
                      {/* <Box className={classes.catBox}> */}
                      {/*   <CatNumber /> */}
                      {/* </Box> */}
                    </Grid>
                    <Grid className={classes.bottomRow}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vitae voluptates illo praesentium est commodi perspiciatis
                      veniam animi? Distinctio vero totam, libero voluptate a,
                      explicabo veritatis facilis dolores ipsum voluptates,
                      deleniti cumque consectetur. Sit doloremque accusamus
                      ratione a, eaque hic nostrum, veniam earum voluptas cum
                      quam repellat fugit nisi ipsam placeat perspiciatis
                      molestias sunt fuga labore. Praesentium, autem?
                      Doloremque, reiciendis veniam!
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid item className={classes.under} xs={12}></Grid>
            <Grid container>
              <Grid className={classes.wrapper} item xs={12}>
                <div className={classes.first}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis cumque rem molestiae excepturi earum voluptate
                  deserunt aspernatur qui non eum maxime quas incidunt facere
                  nostrum atque, beatae animi ullam libero dolore architecto
                  minus voluptates nesciunt vitae! Ut, molestias? Repellat optio
                  reprehenderit quae harum repellendus dignissimos, dolore
                  maxime expedita in. Libero?
                </div>
                <div className={classes.third}>
                  <ResponsivePlayer />
                </div>
                <div className={classes.fifth}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
                  dolorem reiciendis blanditiis laborum repellat, mollitia
                  assumenda consequuntur? Eveniet voluptatum ex atque quae sunt
                  dolor enim nihil harum ipsa facilis ratione, quo ducimus
                  incidunt eaque nobis illum, maxime dignissimos natus esse.
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
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
