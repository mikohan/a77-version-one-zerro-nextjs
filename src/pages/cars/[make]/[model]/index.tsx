import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Grid from '@material-ui/core/Grid';

import { ICar, IPost } from '~/interfaces';
import { IFilter } from '~/interfaces/filters';
import AnimationPage from '~/components/common/AnimationPage';
import { getVehicle } from '~/endpoints/carsEndpoint';
import {
  getProductsByFilters,
  getProductsByTagOrTags,
} from '~/endpoints/productEndpoint';
import { getPosts, getPostsByCar } from '~/endpoints/blogEndpoint';
import { IProductElasticHitsFirst } from '~/interfaces/product';
import { capitalize, makeTree } from '~/utils';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CarModelHead from '~/components/heads/carModelHead';
import { IBread, IRouterStuff } from '~/interfaces';
import { IShopCategory, IActiveFilterMy } from '~/interfaces';
import { IState } from '~/interfaces/IState';
import { pageSize } from '~/config';
import { useRouter } from 'next/router';
import { IAgregations, IAggregationCategory } from '~/interfaces/aggregations';
import { createCheckFilters } from '~/services/filters/filterCreater';
import {
  getActiveFilters,
  makeHandleFilterChange,
  makeHandleDeleteFilter,
  makeHandleDeleteFilters,
  clearParams,
} from '~/services/filters/filterHandler';
import { Router } from 'next/dist/client/router';
import {
  shopProductLoading,
  shopSetFilterVlue,
  shopSetOldPrice,
} from '~/store/shop/shopActions';
import { asString } from '~/helpers';
import ModelShopList from '~/components/car/ModelShopList';
import ModelHomePage from '~/components/car/ModelHomePage';
import { COMPANY_INFORMATION } from '~/config';
import { getPopularProductsByModel } from '~/endpoints/productEndpoint';
import { IProduct } from '~/interfaces';
import { popularProductsQuantity, carShowText } from '~/config';
import { translateProducts } from '~/utils';
import url from '~/services/url';

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
  })
);

interface IModelProps {
  model: ICar;
  categories: IShopCategory[];
  products: IProductElasticHitsFirst;
  totalPages: number;
  routerParams: IRouterStuff;
  routerQuery: IRouterStuff;
  aggregations: IAgregations;
  popularProducts: IProduct[];
  productsToPost: IProduct[];
  posts: IPost[];
  carPosts: IPost[];
}
export interface IBaseFilter<T extends string, V> {
  type: T;
  name: string;
  slug: string;
  value: V;
}

function Model(props: IModelProps) {
  const classes = useStyles();

  const {
    model,
    categories,
    products,
    totalPages,
    routerParams,
    routerQuery,
    aggregations,
    popularProducts,
    productsToPost,
    posts,
    carPosts,
  } = props;
  // If car priority from config show home page otherwise show shop grid
  const showCarHomePage: boolean = model.weight >= carShowText ? true : false;

  const dispatch = useDispatch();
  const router = useRouter();
  Router.events.on('routeChangeStart', () => {
    dispatch(shopProductLoading(true));
  });
  Router.events.on('routeChangeComplete', () => {
    dispatch(shopProductLoading(false));
  });
  const filtersFromStore = useSelector(
    (state: IState) => state.shopNew.filters
  );

  const modelName = capitalize(model.model);
  const makeName = capitalize(model.make.name);
  const header = `Каталог запчастей на ${makeName} ${modelName}`;
  const count: number = products.total.value;
  const breads: IBread[] = [
    { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
    { name: model.make.name, path: url.make(model.make.slug) },
    { name: model.model, path: url.model(model.make.slug, model.slug) },
  ];

  useEffect(() => {
    /* dispatch(setCurrentCarAction(model)); */
    /* setCurCarLocalStorage(model); */
  }, [model]);

  const categoriesFilter: IFilter = {
    type: 'category',
    name: 'Категории',
    slug: 'category',
    value: 'dvigatel',
    items: categories,
  };

  /* // ************************** Price filters ********************* */
  let minPrice: number = 0;
  let maxPrice: number = 0;
  if (
    aggregations.hasOwnProperty('min_price') &&
    aggregations.hasOwnProperty('max_price')
  ) {
    minPrice = aggregations.min_price.value as number;
    maxPrice = aggregations.max_price.value as number;
  }
  /* // Use effect for keeping price */
  const oldPrice = useSelector(
    (state: IState) => state.shopNew.filterPriceOldState
  );
  useEffect(() => {
    if (oldPrice.length === 0) {
      dispatch(shopSetOldPrice([minPrice, maxPrice]));
    }
  }, []);

  const sortedFilters: IFilter[] = createCheckFilters(
    router,
    aggregations,
    filtersFromStore,
    oldPrice,
    'category',
    categoriesFilter
  );
  // ************************** End filters *********************

  const possibleFilters: string[] = sortedFilters.map(
    (item: IFilter) => item.slug
  );

  // Getting filters from state redux

  const activeFilters: IActiveFilterMy[] = getActiveFilters(
    routerParams,
    routerQuery,
    filtersFromStore,
    possibleFilters
  );

  // Putting filters from url to store
  useEffect(() => {
    if (!Object.keys(filtersFromStore).length) {
      for (const filter of activeFilters) {
        const fvalues = filter.filterValues.join(',');
        dispatch(shopSetFilterVlue(filter.filterSlug, fvalues));
      }
    }
  }, []);

  // Function for redirection
  const handleFilterChange = makeHandleFilterChange(
    activeFilters,
    router,
    dispatch,
    model
  );

  const handleDeleteFilter = makeHandleDeleteFilter(
    router,
    dispatch,
    activeFilters,
    model
  );
  const handleDeleteFilters = makeHandleDeleteFilters(router, dispatch, model);

  return (
    <React.Fragment>
      <CarModelHead model={model} breads={breads} />
      <AnimationPage>
        <Grid className={classes.container} container>
          {showCarHomePage ? (
            <ModelHomePage
              products={products}
              header={header}
              breads={breads}
              count={count}
              totalPages={totalPages}
              sortedFilters={[categoriesFilter]}
              popularProducts={popularProducts}
              categories={categories}
              model={model}
              productsToPost={productsToPost}
              posts={posts}
              postsByCar={carPosts}
            />
          ) : (
            <ModelShopList
              header={header}
              breads={breads}
              count={count}
              totalPages={totalPages}
              sortedFilters={sortedFilters}
              products={products}
              handleFilterChange={handleFilterChange}
              handleDeleteFilter={handleDeleteFilter}
              handleDeleteFilters={handleDeleteFilters}
            />
          )}
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const routerParams = context.params;
  const routerQuery = context.query;
  const modelSlug = context.params?.model as string;
  const model: ICar = await getVehicle(modelSlug);
  const filtersQuery = clearParams(
    routerQuery as IRouterStuff,
    routerParams as IRouterStuff
  );

  if (!model) {
    return { notFound: true };
  }

  const str: string = asString(context.query.page as string);
  const page: number = parseInt(str) || 1;

  const page_from = pageSize * (page - 1);

  let url = '';

  if (Object.entries(filtersQuery).length > 0) {
    let filUrl = '';
    let amp = '&';
    Object.entries(filtersQuery).forEach(([filter, value], i) => {
      if (i === Object.entries(filtersQuery).length - 1) {
        amp = '';
      }
      filUrl += `${filter}=${value}${amp}`;
    });
    url = `?model=${modelSlug}&${filUrl}&page_from=${page_from}&page_size=${pageSize}`;
  } else {
    url = `?model=${modelSlug}&page_from=${page_from}&page_size=${pageSize}`;
  }

  const popularProducts = await getPopularProductsByModel(
    [modelSlug],
    popularProductsQuantity
  );
  const promise = await getProductsByFilters(url);

  const categories: IAggregationCategory[] =
    promise.aggregations.categories.buckets;
  let products: IProductElasticHitsFirst = promise.hits;
  const prodCount: number = products.total.value;

  const totalPages = Math.ceil(prodCount / pageSize);

  const aggregations: IAgregations = promise.aggregations;

  // Products by some search tags or something
  const query = modelSlug ? modelSlug : 'двигатель';
  const productsByTags = await getProductsByTagOrTags(query, 30);
  const productsToPost: IProduct[] = translateProducts(
    productsByTags.hits.hits
  );
  const posts = await getPosts(5);
  const carPosts = await getPostsByCar(modelSlug, 10);

  if (!promise) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      model,
      categories: makeTree(categories),
      products: products,
      aggregations,
      totalPages: totalPages,
      routerParams,
      routerQuery,
      popularProducts,
      productsToPost,
      posts,
      carPosts,
    },
  };
};

export default Model;
