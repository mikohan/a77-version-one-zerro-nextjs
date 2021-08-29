import React from 'react';
import { GetServerSideProps } from 'next';
import { COMPANY_INFORMATION, pageSize } from '~/config';
import { Grid, Hidden } from '@material-ui/core';
import AnimationPage from '~/components/common/AnimationPage';
import CarMakeHead from '~/components/heads/carMakeHead';
import PageHeader from '~/components/product/PageHeader';
import { ICar } from '~/interfaces/ICar';
import { IMake } from '~/interfaces/IMake';
import { getVehiclesByMake, getMake } from '~/endpoints/carsEndpoint';
import ShopGrid from '~/components/product/ShopGrid';
import { IBread } from '~/interfaces/IBread';
import { capitalize } from '~/utils';
import { getProductsByMake } from '~/endpoints/productEndpoint';
import { IPost, IProductElasticHitsFirst } from '~/interfaces';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ModelBlockGrid from '~/components/car/ModelGridBlock';
import { Typography } from '@material-ui/core';
import { getPosts } from '~/endpoints/blogEndpoint';
import { carWithCountAndCats } from '~/endpoints/carsEndpoint';
import BlogGrid from '~/components/car/BlogGrid';
import url from '~/services/url';
import { asString } from '~/helpers';

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
  totalPages: number;
}

function Make(props: ICarProps) {
  const classes = useStyles();
  const { make, models, products, carCountCat, posts, totalPages } = props;

  const count = products.total.value;

  const breads: IBread[] = [
    { name: `${COMPANY_INFORMATION.COMPANY_NAME_LOGO}`, path: '/' },
    { name: make.name, path: url.make(make.slug) },
  ];
  const makeName = capitalize(make.name);
  const header = `Запчасти для ${makeName}`;
  const filtersResetHandlers = {
    handleDeleteFilter: (filter: string, value: string): void => {},
    handleDeleteFilters: (): void => {},
  };

  return (
    <React.Fragment>
      <CarMakeHead make={make} breads={breads} />
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
            <Hidden smDown>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Запчасти {capitalize(make.name)}
                </Typography>
                <ShopGrid
                  products={products.hits}
                  filtersResetHandlers={filtersResetHandlers}
                  totalPages={totalPages}
                />
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug: string = context.params?.make as string;
  const make: IMake = await getMake(slug);

  const str: string = asString(context.query.page as string);
  const page: number = parseInt(str) || 1;

  const page_from = pageSize * (page - 1);

  const models: ICar[] = await getVehiclesByMake(make.slug.toLowerCase());
  const promise = await getProductsByMake(slug, pageSize, page_from);
  const products: IProductElasticHitsFirst = promise.hits;
  const carCountCat = await carWithCountAndCats(slug);
  const posts = await getPosts(6);

  const prodCount: number = products.total.value;

  const totalPages = Math.ceil(prodCount / pageSize);

  return {
    // revalidate: 5, //REVALIDATE,
    props: {
      models: models,
      make: make,
      products: products,
      carCountCat,
      posts,
      totalPages,
    },
  };
};

/* export const getStaticPaths: GetStaticPaths = async () => { */
/*   const makes: IMake[] = await getMakes(); */
/*   const paths = makes.map((make: any) => { */
/*     return { params: { make: make.slug } }; */
/*   }); */

/*   return { */
/*     fallback: 'blocking', */
/*     paths: paths, */
/*   }; */
/* }; */

export default Make;
