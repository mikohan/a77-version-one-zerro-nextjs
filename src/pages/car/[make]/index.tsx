import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { containerMaxWidth, REVALIDATE, COMPANY_INFORMATION } from '~/config';
import { Grid, Hidden } from '@material-ui/core';
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
import { IProductElasticHitsFirst } from '~/interfaces';
import LeftSidebar from '~/components/product/LeftSideBar';
import ModelList from '~/components/car/ModelsList';
import { Container, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ModelBlockGrid from '~/components/car/ModelGridBlock';
import PopularModels from '~/components/car/PopularModelWidget';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blockPaper: {
      padding: theme.spacing(2),
    },
    blockGrid: {
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    widgetItem: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);
interface ICarProps {
  models: ICar[];
  make: IMake;
  products: IProductElasticHitsFirst;
  popularModels: ICar[];
}

function Make(props: ICarProps) {
  const classes = useStyles();
  const { make, models, products, popularModels } = props;
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
        <Container maxWidth={containerMaxWidth}>
          <Grid container>
            <PageHeader header={header} breads={breads} count={count} />
            <Hidden smDown>
              <Grid item xs={3}>
                <LeftSidebar>
                  <Grid container>
                    <Grid className={classes.widgetItem} item xs={12}>
                      <Typography variant="h6">
                        Популярные Модели {`${capitalize(make.name)}`}
                      </Typography>
                      <PopularModels models={popularModels} />
                    </Grid>
                    <Grid className={classes.widgetItem} item xs={12}>
                      <Typography variant="h6">
                        Все Модели {`${capitalize(make.name)}`}
                      </Typography>
                      <ModelList models={models} />
                    </Grid>
                  </Grid>
                </LeftSidebar>
              </Grid>
            </Hidden>
            <Grid item xs={12} md={9}>
              <Grid className={classes.blockGrid} item xs={12}>
                <Paper className={classes.blockPaper}>
                  <ModelBlockGrid models={models} />
                </Paper>
              </Grid>
              <Grid className={classes.blockGrid} item xs={12}>
                <Paper className={classes.blockPaper}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
                  sit aut, necessitatibus, sed ad porro dignissimos totam error
                  omnis quia pariatur consequatur labore repudiandae doloremque
                  praesentium rerum! Necessitatibus, quod facilis asperiores
                  atque nostrum recusandae perferendis expedita. Mollitia amet
                  earum eligendi ipsam totam cupiditate adipisci cum, hic illum
                  facilis reiciendis, architecto itaque illo consectetur! Animi
                  omnis numquam nesciunt molestiae, architecto consequuntur.
                </Paper>
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
        </Container>
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

  return {
    revalidate: REVALIDATE,
    props: {
      models: models,
      make: make,
      products: products,
      popularModels,
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
