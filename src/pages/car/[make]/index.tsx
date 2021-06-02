import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { containerMaxWidth, REVALIDATE, COMPANY_INFORMATION } from '~/config';
import { Box, Grid, Hidden } from '@material-ui/core';
import AnimationPage from '~/components/common/AnimationPage';
import CarMakeHead from '~/components/heads/carMakeHead';
import PageHeader from '~/components/product/PageHeader';
import { ICar } from '~/interfaces/ICar';
import { IMake } from '~/interfaces/IMake';
import { getVehiclesByMake, getMake, getMakes } from '~/endpoints/carsEndpoint';
import ShopGrid from '~/components/product/ShopGrid';
import { IBread } from '~/interfaces/IBread';
import { capitalize } from '~/utils';
import { getProductsByMake } from '~/endpoints/productEndpoint';
import { IPost, IProductElasticHitsFirst } from '~/interfaces';
import LeftSidebar from '~/components/product/LeftSideBar';
import ModelList from '~/components/car/ModelsList';
import { Container, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ModelBlockGrid from '~/components/car/ModelGridBlock';
import PopularModels from '~/components/car/PopularModelWidget';
import { Typography } from '@material-ui/core';
import { getPosts } from '~/endpoints/blogEndpoint';
import LatestPosts from '~/components/blog/LatestPosts';
import { carWithCountAndCats } from '~/endpoints/carsEndpoint';
import BlogGrid from '~/components/car/BlogGrid';

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
    },
    blockGrid: {
      paddingBottom: theme.spacing(5),
    },
    title: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1),
    },
  })
);
interface ICarProps {
  models: ICar[];
  make: IMake;
  products: IProductElasticHitsFirst;
  popularModels: ICar[];
  latestPosts: IPost[];
  carCountCat: any;
  posts: IPost[];
}

function Make(props: ICarProps) {
  const classes = useStyles();
  const {
    make,
    models,
    products,
    carCountCat,
    posts,
    popularModels,
    latestPosts,
  } = props;
  const count = products.total.value;

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: make.name, path: `/car/${make.slug}` },
  ];
  const makeName = capitalize(make.name);
  const header = `Запчасти для ${makeName}`;
  const filtersResetHandlers = {
    handleDeleteFilter: (filter: string, value: string): void => {},
    handleDeleteFilters: (): void => {},
  };

  return (
    <React.Fragment>
      <CarMakeHead make={make} />
      <AnimationPage>
        <Grid className={classes.container} container>
          <PageHeader header={header} breads={breads} count={count} />
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h6">
                Наши основные Машины
              </Typography>
              <ModelBlockGrid
                models={models}
                carCountCat={carCountCat}
                isMainCars
              />

              <Grid className={classes.blockGrid} item xs={12}>
                <Typography className={classes.title} variant="h6">
                  Машины на которые тоже есть запчасти
                </Typography>
                <ModelBlockGrid
                  models={models}
                  carCountCat={carCountCat}
                  isMainCars={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.title}>
                Полезные статьи про {capitalize(make.name)}
              </Typography>
              {posts && <BlogGrid posts={posts} />}
            </Grid>
            <Grid item xs={12}>
              {
                <ShopGrid
                  products={products.hits}
                  filtersResetHandlers={filtersResetHandlers}
                />
              }
            </Grid>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug: string = context.params?.make as string;
  const make: IMake = await getMake(slug);

  const models: ICar[] = await getVehiclesByMake(make.slug.toLowerCase());
  const promise = await getProductsByMake(slug);
  const products: IProductElasticHitsFirst = promise.hits;
  const popularModels: ICar[] = models.filter(
    (model: ICar) => +model.priority > COMPANY_INFORMATION.POPULARITY_MODEL
  );
  const latestPosts = await getPosts(5);
  const carCountCat = await carWithCountAndCats(slug);
  const posts = await getPosts(6);

  return {
    revalidate: REVALIDATE,
    props: {
      models: models,
      make: make,
      products: products,
      popularModels,
      latestPosts,
      carCountCat,
      posts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const makes: IMake[] = await getMakes();
  const paths = makes.map((make: any) => {
    return { params: { make: make.slug } };
  });

  return {
    fallback: false,
    paths: paths,
  };
};

export default Make;
