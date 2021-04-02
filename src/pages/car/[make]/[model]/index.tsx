import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Grid from '@material-ui/core/Grid';

import { ICar } from '~/interfaces/ICar';
import { IFilter } from '~/interfaces/filters';
import AnimationPage from '~/components/common/AnimationPage';
import { setCurrentCarAction } from '~/store/actions';
import { getVehicle, getVehicles } from '~/endpoints/carsEndpoint';
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
  totalPages: number;
}
export interface IBaseFilter<T extends string, V> {
  type: T;
  name: string;
  slug: string;
  value: V;
}

function Model(props: IModelProps) {
  const classes = useStyles();
  const { model, categories, products, totalPages } = props;
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
              <ShopGrid products={products.hits} totalPages={totalPages} />
            </Grid>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const page: number = parseInt(context.query.page as string) || 1;
  const modelSlug = context.params?.model as string;
  const vehicle: ICar = await getVehicle(modelSlug);

  const page_from = pageSize * (page - 1);

  const promise = await getProductsByCar(vehicle.slug, page_from, pageSize);
  const categories: IAggregationCategory[] =
    promise.aggregations.categories.buckets;
  const products = promise.hits;

  const prodCount: number = products.total.value;
  const totalPages = Math.ceil(prodCount / pageSize);

  if (!promise) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      model: vehicle,
      categories: makeTree(categories),
      products: products,
      totalPages: totalPages,
    },
  };
};

export default Model;
