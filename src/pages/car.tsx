import React from 'react';
import { GetServerSideProps } from 'next';
import AnimationPage from '~/components/common/AnimationPage';
import ShopCarGrid from '~/components/product/ShopMakeGrid';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Container, Grid, Hidden, Typography, Paper } from '@material-ui/core';
import { IMake } from '~/interfaces/IMake';
import { getMakes } from '~/endpoints/carsEndpoint';
import { containerMaxWidth } from '~/config';
import CarHead from '~/components/heads/CarHead';
import PopularMakes from '~/components/car/PopularMakesWidet';
import Breads from '~/components/common/BreadCrumbs';
import { IBread, IPost, IProduct } from '~/interfaces';
import url from '~/services/url';
import { getPosts } from '~/endpoints/blogEndpoint';
import LatestPosts from '~/components/blog/LatestPosts';
import ProductGrid from '~/components/blog/ProductGrid';
import { translateProducts } from '~/utils';
import { getProductsByTagOrTags } from '~/endpoints/productEndpoint';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '0 auto',
      [theme.breakpoints.down('lg')]: {
        maxWidth: '80%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '70%',
      },
      paddingBottom: theme.spacing(3),
    },
    leftPanel: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    breads: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    pageTitle: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: theme.spacing(2),
    },
    latestPosts: {
      marginTop: theme.spacing(2),
    },
    mayLike: {
      paddingBottom: theme.spacing(2),
    },
  })
);

interface ICarProps {
  makes: IMake[];
  popularMakes: IMake[];
  latestPosts: IPost[];
  products: IProduct[];
}

function Car(props: ICarProps) {
  const classes = useStyles();
  const { makes, popularMakes, latestPosts, products } = props;

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: 'Машины', path: url.cars() },
  ];
  return (
    <React.Fragment>
      <CarHead />
      <AnimationPage>
        <Container className={classes.container} maxWidth={containerMaxWidth}>
          <Grid container>
            <Grid className={classes.breads} item xs={12}>
              <Breads breadCrumbs={breads} />
            </Grid>
            <Grid className={classes.pageTitle} item xs={12}>
              <Typography variant="h1">Марки машин</Typography>
            </Grid>
            <Hidden smDown>
              <Grid className={classes.leftPanel} item xs={3}>
                <PopularMakes makes={popularMakes} />
                <Paper className={classes.latestPosts}>
                  <LatestPosts posts={latestPosts} />
                </Paper>
              </Grid>
            </Hidden>
            <Grid item xs={12} md={9}>
              <Grid container>
                <Grid item xs={12}>
                  <ShopCarGrid cars={makes} />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.mayLike} variant="h6">
                    Вам может понравиться
                  </Typography>
                  <ProductGrid products={products} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const makes: IMake[] = await getMakes();
  const sortedMakes = makes
    .slice()
    .sort((a: IMake, b: IMake) => +b.priority - +a.priority);
  const popularMakes = makes.filter((make: IMake) => {
    if (make && make.priority) {
      const priority =
        typeof make.priority === 'string'
          ? parseInt(make.priority)
          : make.priority;
      return priority > 3;
    }
    return false;
  });

  const latestPosts = await getPosts(6);
  const productsByTags = await getProductsByTagOrTags('двигатель', 30);
  const productsToPost: IProduct[] = translateProducts(
    productsByTags.hits.hits
  );

  return {
    props: {
      makes: sortedMakes,
      popularMakes,
      latestPosts,
      products: productsToPost,
    },
  };
};

export default Car;
