import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetStaticPaths, GetStaticProps } from 'next';
import Grid from '@material-ui/core/Grid';

import { ICar } from '~/interfaces/ICar';
import { ICategory } from '~/interfaces/category';
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
import { Hidden } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CarModelHead from '~/components/heads/carModelHead';
import { IBread } from '~/interfaces';
import PageHeader from '~/components/product/PageHeader';
import ShopGrid from '~/components/product/ShopGrid';
import FilterWidget from '~/components/product/FilterWidget';
import LeftSideBar from '~/components/product/LeftSideBar';
import { IShopCategory } from '~/interfaces';
import useLocalstorageState from '~/hooks/useLocalStorage';
import { pageSize } from '~/config';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface IModelProps {
  model: ICar;
  categories: IShopCategory[];
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
  const modelName = capitalize(model.model);
  const makeName = capitalize(model.make.name);
  const header = `Запчасти для ${makeName} ${modelName}`;
  const count: number = products.total.value;
  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: model.make.name, path: `/car/${model.make.slug}` },
    { name: model.model, path: `/car/${model.make.slug}/${model.slug}` },
  ];

  const dispatch = useDispatch();
  const [curCarLocalStorage, setCurCarLocalStorage] = useLocalstorageState(
    'currentCar',
    {}
  );
  useEffect(() => {
    dispatch(setCurrentCarAction(model));
    /* setCurCarLocalStorage(model); */
  }, [model]);

  const filterCategory: IFilter = {
    type: 'category',
    name: 'category',
    slug: 'category',
    value: 'dvigatel',
    items: categories,
  };

  const filters = [];
  filters.push(filterCategory);

  return (
    <React.Fragment>
      <CarModelHead model={model} />
      <AnimationPage>
        <Grid container>
          <PageHeader header={header} breads={breads} count={count} />
          <Hidden smDown>
            <Grid item xs={3}>
              <LeftSideBar>
                <FilterWidget filters={filters} />
              </LeftSideBar>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={9}>
            <Grid item xs={12}>
              <ShopGrid products={products.hits} />
            </Grid>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const modelSlug = context.params?.model as string;
  const vehicle: ICar = await getVehicle(modelSlug);

  const page: number = parseInt(context.params?.page as string) || 1;
  const page_size = pageSize;
  const page_from = page_size * (page - 1);

  const promise = await getProductsByCar(vehicle.slug, page_from, page_size);
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
