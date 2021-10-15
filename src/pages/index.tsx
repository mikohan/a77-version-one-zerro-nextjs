import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GetStaticProps } from 'next';
import { getVehiclesByPriority } from '~/endpoints/carsEndpoint';
import Animation from '~/components/common/AnimationPage';
import { Box, Typography, Container, Hidden, NoSsr } from '@material-ui/core';
import { containerMaxWidth } from '~/config';
import CarChioserLong from '~/components/car/CarChoiserLong';
import { getPosts } from '~/endpoints/blogEndpoint';
import { ICar, IPost, IProduct } from '~/interfaces';
import BlogGrid from '~/components/car/BlogGrid';
import ModelBlockGrid from '~/components/car/ModelGridHomePageBlock';
import { getLatestProducts } from '~/endpoints/productEndpoint';
import { translateProducts } from '~/utils';
import RelatedProductSlider from '~/components/common/RelatedProductSlider';
import Divider from '~/components/common/Divider';
import HomeHead from '~/components/heads/HomeHead';
import OilGridHomePage from '~/components/car/OilGridHomePage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h1: {
      textAlign: 'center',
      marginBottom: theme.spacing(5),
      color:
        theme.palette.type === 'light'
          ? theme.palette.background.default
          : '#fafafa',
      fontSize: '2rem',
      fontWeight: 700,
    },
    topBlock: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      marginTop: theme.spacing(3),
      minHeight: '20rem',
    },
    contentContainer: {
      padding: theme.spacing(3),
      margin: '0 auto',
      [theme.breakpoints.up('lg')]: {
        maxWidth: '85%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '75%',
      },
    },
    blockTitle: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    carChoiser: {
      backgroundImage: `url("/images/local/defaultParts500.jpg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

interface IHomeProps {
  models: ICar[];
  posts: IPost[];
  latestProducts: IProduct[];
}

export default function Home(props: IHomeProps) {
  const classes = useStyles();

  const { posts, models, latestProducts } = props;

  return (
    <React.Fragment>
      <HomeHead />
      <Animation>
        <Grid container>
          <Grid item xs={12} className={classes.carChoiser}>
            <Box className={classes.topBlock}>
              <Container maxWidth={containerMaxWidth}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography className={classes.h1} variant="h1">
                      Запчасти для грузовиков и комерческого транспорта
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ opacity: 0.9 }}>
                    <NoSsr>
                      <CarChioserLong size="lg" />
                    </NoSsr>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Grid>
        </Grid>
        <div className={classes.contentContainer}>
          <Grid container>
            <Grid item container xs={6}>
              <Typography variant="h6" className={classes.blockTitle}>
                Популярные Машины
              </Typography>
              <Grid container>
                <ModelBlockGrid models={models} />
              </Grid>
            </Grid>
            <Grid item container xs={6}>
              <Typography variant="h6" className={classes.blockTitle}>
                Популярные Машины
              </Typography>
              <Grid container>
                <OilGridHomePage models={models} />
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Hidden smDown>
            <Grid container>
              <Typography variant="h6" className={classes.blockTitle}>
                Популярные товары
              </Typography>
              <Grid container>
                <RelatedProductSlider products={latestProducts} />
              </Grid>
            </Grid>
            <Divider />
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Блог
              </Typography>
              <Box>
                <BlogGrid posts={posts} />
              </Box>
            </div>
            <Divider />
          </Hidden>
        </div>
      </Animation>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts(20);
  const models = await getVehiclesByPriority(3);
  const latestProds = await getLatestProducts(20);
  const latestProducts = translateProducts(latestProds.hits.hits);

  return { props: { posts, models, latestProducts } };
};
