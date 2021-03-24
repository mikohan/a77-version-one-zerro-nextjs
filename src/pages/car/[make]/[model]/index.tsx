import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetStaticPaths, GetStaticProps } from 'next';
import Grid from '@material-ui/core/Grid';

import { ICar } from '~/interfaces/ICar';
import { ICategory } from '~/interfaces/category';
import { Box } from '@material-ui/core';
import FilterWidget from '~/components/main/FilterWidget';
import LeftSideBar from '~/components/main/LeftSideBar';
import { REVALIDATE } from '~/config';
import { IFilter } from '~/interfaces/filters';
import AnimationPage from '~/components/common/AnimationPage';
import { setCurrentCarAction } from '~/store/actions';
import { getVehicle, getVehicles } from '~/endpoints/carsEndpoint';
import { toLoverSpace } from '~/helpers';
import { getProductsByCar } from '~/endpoints/productEndpoint';
import { IAggregationCategory } from '~/interfaces/aggregations';
import { IProductElasticHitsFirst } from '~/interfaces/product';
import { capitalize, makeTree } from '~/utils';
import { Typography, Hidden } from '@material-ui/core';
import CarChoiser from '~/components/common/CarChoiser';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CarModelHead from '~/components/heads/carModelHead';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    productCount: {
      color: theme.palette.grey[500],
    },
  })
);

interface IModelProps {
  model: ICar;
  categories: ICategory[];
  products: IProductElasticHitsFirst;
}
export interface IBaseFilter<T extends string, V> {
  type: T;
  name: string;
  slug: string;
  value: V;
}

function Model(props: IModelProps) {
  const classes = useStyles();
  const { model, categories, products } = props;
  const carName = capitalize(model.model);
  const carModelName = capitalize(model.make.name);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentCarAction(model));
  }, [model]);

  const filterCategory: IFilter = {
    type: 'category',
    name: 'category',
    slug: 'category',
    value: 'dvigatel',
    items: [],
  };

  const filters = [];
  //filters.push(filterCategory);

  return (
    <React.Fragment>
      <CarModelHead model={model} />
      <AnimationPage>
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.pageHeader} height={100}>
              <Typography variant="h1">
                Запчасти для {carModelName} {carName}{' '}
                <Typography
                  className={classes.productCount}
                  component="span"
                  variant="body2"
                >
                  (1 456 products)
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item xs={2} style={{ border: '1px solid green' }}>
              LEFT SIDE PANE
            </Grid>
          </Hidden>
          <Grid style={{ border: '1px solid green' }} item xs={12} md={10}>
            <CarChoiser />
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const modelSlug = context.params?.model as string;
  const vehicle: ICar = await getVehicle(modelSlug);

  const promise = await getProductsByCar(vehicle.slug);
  const categories: IAggregationCategory[] =
    promise.aggregations.categories.buckets;
  const products = promise.hits;

  return {
    revalidate: REVALIDATE,
    props: {
      model: vehicle,
      categories: makeTree(categories),
      products: products,
    },
  };
};

//Get Static Paths
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const models = await getVehicles();
  for (let model of models) {
    paths.push({
      params: {
        make: toLoverSpace(model.make.slug),
        model: toLoverSpace(model.slug),
      },
    });
  }

  return {
    fallback: false,
    paths: paths,
  };
};

export default Model;
