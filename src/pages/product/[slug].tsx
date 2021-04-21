import React from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { DEFAULT_EXCERPT, REVALIDATE } from '~/config';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import ProductPageHead from '~/components/heads/ProductPageHead';

import { ICar, IProduct } from '~/interfaces';
import {
  getProduct,
  getProductsAll,
  getSimilarProducts,
} from '~/endpoints/productEndpoint';
import ProductPageHeader from '~/components/product/productPage/ProductPageHeader';
import { IBread } from '~/interfaces';
import ResponsivePlayer from '~/components/common/ResponsivePlayer';
import SwiperProduct from '~/components/common/SwiperProduct';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import ProductTabs from '~/components/product/productPage/ProductTabs';
import RelatedProductSlider from '~/components/common/RelatedProductSlider';
import {
  getPopularProductsByModel,
  getProductAnalogs,
} from '~/endpoints/productEndpoint';
import ProductAnalogs from '~/components/product/productPage/ProductAnalogs';
import ProductPriceSideBlock from '~/components/product/productPage/ProductPriseSideBlock';

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

    descriptionGrid: {
      paddingLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(3),
        paddingLeft: 0,
        paddingRight: theme.spacing(1),
      },
    },
    under: {
      height: theme.spacing(10),
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
  userUUID: string;
  relatedProducts: IProduct[];
  analogs: IProduct[];
  similar: IProduct[];
}
export default function ProductPage({
  product,
  relatedProducts,
  analogs,
  similar,
}: IProps) {
  const classes = useStyles();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: product.name, path: `/product/${product.slug}` },
  ];

  const productAnalogs: IProduct[] = analogs && analogs.length ? analogs : [];
  const productSimilar: IProduct[] = similar && similar.length ? similar : [];
  const togetherProducts: IProduct[] =
    product.related && product.related.length ? product.related : [];

  const PopularParts = () => {
    return (
      <React.Fragment>
        <Grid item className={classes.tabs} xs={12}>
          <Typography variant="h6">Популярные запчасти</Typography>
        </Grid>
        <Grid item className={classes.tabs} xs={12}>
          <Box>
            <RelatedProductSlider products={relatedProducts} />
          </Box>
        </Grid>
      </React.Fragment>
    );
  };

  const SimilarProducts = () => {
    return (
      <React.Fragment>
        <Grid item className={classes.tabs} xs={12}>
          <Typography variant="h6">Похожие запчасти</Typography>
        </Grid>
        <Grid item className={classes.tabs} xs={12}>
          <Box>
            <RelatedProductSlider products={productSimilar} />
          </Box>
        </Grid>
      </React.Fragment>
    );
  };
  const TogetherProducts = () => {
    return (
      <React.Fragment>
        <Grid item className={classes.tabs} xs={12}>
          <Typography variant="h6">Может понадобиться</Typography>
        </Grid>
        <Grid item className={classes.tabs} xs={12}>
          <Box>
            <RelatedProductSlider products={togetherProducts} />
          </Box>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ProductPageHead product={product} />
      <AnimationPage>
        <div className={classes.mainContainer}>
          <Grid container>
            <Grid className={classes.headerContainer} item xs={12}>
              <ProductPageHeader breads={breads} />
            </Grid>
            <Grid className={classes.gridRow} container item xs={12}>
              <Grid className={classes.swipeGrid} item xs={12} md={6}>
                <Paper className={classes.swiperPaper}>
                  <SwiperProduct product={product} />
                </Paper>
              </Grid>
              <Grid className={classes.descriptionGrid} item xs={12} md={6}>
                <ProductPriceSideBlock product={product} />
              </Grid>
            </Grid>
            <Grid item className={classes.under} xs={12}></Grid>
            <Grid container item>
              <Grid className={classes.wrapper} item xs={12} md={6}>
                <Paper>
                  {product.video && product.video.length ? (
                    product.video.map((vid: string) => (
                      <div key={vid} className={classes.third}>
                        <ResponsivePlayer videoUrl={vid} />
                      </div>
                    ))
                  ) : (
                    <div>
                      <ResponsivePlayer
                        videoUrl={'https://youtu.be/a9I1oNYj26o'}
                      />
                    </div>
                  )}
                </Paper>
              </Grid>
              <Grid className={classes.analogs} item xs={12} md={6}>
                <Paper className={classes.analogPaper}>
                  <Typography variant="h6">Аналоги</Typography>
                  <ProductAnalogs products={productAnalogs} />
                </Paper>
                <div></div>
              </Grid>
              {togetherProducts && togetherProducts.length ? (
                <TogetherProducts />
              ) : (
                ''
              )}
              <Grid item className={classes.tabs} xs={12}>
                <Paper>
                  <ProductTabs product={product} />
                </Paper>
              </Grid>
              {similar && similar.length ? <SimilarProducts /> : ''}
              {relatedProducts && relatedProducts.length ? (
                <PopularParts />
              ) : (
                ''
              )}
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

  let models = product.model.map((car: ICar) => car.slug);

  let relatedProducts: IProduct[] = [];
  let analogs: IProduct[] = [];
  let similar: IProduct[] = [];
  if (product && product.catNumber) {
    if (product.id) {
      analogs = await getProductAnalogs(product.catNumber, product.id);
    }
    // it is working good but very slow
    //similar = await getSimilarProducts(slug as string, 20);
  }

  // It is working not very goog because of same products on all pages
  // needs to change logic
  //relatedProducts = await getPopularProductsByModel(models, 20);

  return {
    revalidate: REVALIDATE,
    props: {
      product,
      relatedProducts,
      analogs,
      similar,
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
