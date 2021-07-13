import React, { useEffect } from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { DEFAULT_EXCERPT, REVALIDATE, imageServerUrl } from '~/config';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import ProductPageHead from '~/components/heads/ProductPageHead';

import { ICar, IPost, IProduct, IProductElasticHitsSecond } from '~/interfaces';
import {
  getProduct,
  getProductsAll,
  getProductsByTagOrTags,
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
  getSimilarProductsByModel,
  getProductAnalogs,
} from '~/endpoints/productEndpoint';
import { searchPosts } from '~/endpoints/blogEndpoint';
import ProductAnalogs from '~/components/product/productPage/ProductAnalogs';
import ProductPriceSideBlock from '~/components/product/productPage/ProductPriseSideBlock';
import { translateProducts } from '~/utils';
import url from '~/services/url';
import ProductGrid from '~/components/blog/ProductGrid';
import RelatedPosts from '~/components/product/productPage/RelatedPosts';
import Divider from '~/components/common/Divider';
import useLocalStorage from '~/hooks/useLocalStorage';

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
        maxWidth: '80%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '70%',
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
    mayLike: {
      paddingBottom: theme.spacing(2),
    },
    relatedPostTitle: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  })
);

interface IProps {
  product: IProduct;
  userUUID: string;
  relatedProducts: IProduct[];
  analogs: IProduct[];
  similar: IProduct[];
  productsToPost: IProduct[];
  model: string;
  make: string;
  posts: IPost[];
}
export default function ProductPage({
  product,
  relatedProducts,
  analogs,
  similar,
  model,
  make,
  productsToPost,
  posts,
}: IProps) {
  const classes = useStyles();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  let breads: IBread[] = [];
  try {
    const catBreads = product.breads[0].map(
      (item: { slug: string; name: string }) => ({
        name: item.name,
        path: url.category(make, model, item.slug),
      })
    );

    breads = [
      { name: 'Ангара77', path: '/' },
      ...catBreads,
      { name: product.name, path: url.product(product.slug) },
    ];
  } catch (e) {
    breads = [
      { name: 'Ангара77', path: '/' },
      { name: product.name, path: url.product(product.slug) },
    ];
  }

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
      <ProductPageHead product={product} breads={breads} />
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
              <Divider />
              <Grid item className={classes.tabs} xs={12}>
                <Typography className={classes.relatedPostTitle} variant="h6">
                  Полезная информация
                </Typography>
                <RelatedPosts posts={posts} />
              </Grid>
              <Divider />
              {similar && similar.length ? <SimilarProducts /> : ''}
              {relatedProducts && relatedProducts.length ? (
                <React.Fragment>
                  <Divider />
                  <PopularParts />
                </React.Fragment>
              ) : (
                ''
              )}
            </Grid>
            {productsToPost && (
              <React.Fragment>
                <Divider />
                <Grid container item xs={12}>
                  <Typography className={classes.mayLike} variant="h6">
                    Вам может понравиться
                  </Typography>
                  <ProductGrid products={productsToPost} />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params!;
  const product: IProduct = await getProduct(slug as string);
  if (!product) {
    return { notFound: true };
  }

  const model = product.model.length ? product.model[0].slug : '';
  const make = product.model.length ? product.model[0].make.slug : '';

  let relatedProducts: IProduct[] = [];
  let analogs: IProduct[] = [];
  let sim: IProductElasticHitsSecond[] = [];
  if (product && product.catNumber) {
    if (product.id) {
      analogs = await getProductAnalogs(product.catNumber, product.id);
    }
    // it is working good but very slow
    try {
      // similar = await getSimilarProducts(slug as string, 20);
      const prom = await getSimilarProductsByModel(model, product.name);
      sim = prom.hits.hits;
    } catch (e) {
      console.error('Error ocurs in get similar products', e);
    }
  }

  let similar: IProduct[] = [];
  if (sim.length) {
    similar = translateProducts(sim);
  }
  // It is working not very goog because of same products on all pages
  // needs to change logic
  //relatedProducts = await getPopularProductsByModel(models, 20);
  let prodModel: string | undefined = '';
  if (product.model && product.model.length) {
    prodModel = product.model[0]?.name?.replace(
      /[&\/\\#,+()$~%.'":*?<>{}]/g,
      ''
    );
  }
  const query =
    product.tags && product.tags.length
      ? product.tags.join(' ')
      : `${product.name} ${prodModel}`;
  const productsByTags = await getProductsByTagOrTags(query, 30);
  const productsToPost: IProduct[] = translateProducts(
    productsByTags.hits.hits
  );

  const safe = `${product.name} ${prodModel}`;
  let posts: IPost[] = [];
  posts = await searchPosts(safe, 0, 10);

  return {
    revalidate: REVALIDATE,
    props: {
      product,
      relatedProducts,
      analogs,
      similar,
      model,
      make,
      productsToPost,
      posts,
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
  let i = 0;
  for (let prod of prods) {
    if (i > 10) {
      break;
    }
    i++;
    if (prod._source.slug) {
      paths.push({ params: { slug: prod._source.slug } });
    } else {
      console.log('Something wrong with slug in product');
    }
  }

  return {
    fallback: 'blocking',
    paths: paths,
  };
};
