import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { searchTree } from '~/utils';

import { Grid } from '@material-ui/core';
import { ICar } from '~/interfaces/ICar';
import { getCategoryBySlugGQL } from '~/endpoints/categories';
import { asString } from '~/helpers';
import { IFilter } from '~/interfaces/filters';
import { ICategory, IShopCategory } from '~/interfaces/category';
import AnimationPage from '~/components/common/AnimationPage';
import { getVehicle } from '~/endpoints/carsEndpoint';
import { IAgregations, IAggregationCategory } from '~/interfaces/aggregations';
import { IProductElasticHitsFirst } from '~/interfaces/product';
import { makeTree, OrderBreads } from '~/utils';
import ShopGrid from '~/components/product/ShopGrid';
import { Hidden } from '@material-ui/core';
import FilterWidget from '~/components/product/FilterWidget';
import LeftSideBar from '~/components/product/LeftSideBar';
import SearchHead from '~/components/heads/SearchHead';
import { getCatPath } from '~/services/utils';
import { IBread, IRouterStuff } from '~/interfaces';
import url from '~/services/url';
import { capitalize } from '~/utils';
import PageHeader from '~/components/product/PageHeader';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import {
  getProductsAll,
  getProductsByFilters,
} from '~/endpoints/productEndpoint';
import { IActiveFilterMy } from '~/interfaces';
import { Router } from 'next/dist/client/router';
import {
  shopProductLoading,
  shopSetFilterVlue,
  shopSetOldPrice,
} from '~/store/shop/shopActions';
import { containerMaxWidth, pageSize } from '~/config';
import {
  getActiveFilters,
  makeHandleDeleteFilter,
  makeHandleDeleteFilters,
  makeHandleFilterChange,
  clearParams,
} from '~/services/filters/filterHandler';
import { createCheckFilters } from '~/services/filters/filterCreater';
import { Container } from '@material-ui/core';

interface CategoryProps {
  category: IShopCategory;
  categoriesForFilter: ICategory[];
  categoryId?: number;
  products: IProductElasticHitsFirst;
  make: string;
  model: ICar;
  updated: Date;
  catPath: ICategory[];
  categories: ICategory[];
  aggregations: IAgregations;
  totalPages: number;
  routerQuery: IRouterStuff;
  routerParams: IRouterStuff;
}

export default function Cagetory(props: CategoryProps) {
  const {
    category,
    categories,
    model,
    products,
    catPath,
    aggregations,
    totalPages,
    routerQuery,
  } = props;

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
  const search = routerQuery.search;

  const header = `${search} Have found or not have found `;
  const count = products.total.value;

  const orderedCatBreads = catPath.sort(OrderBreads);
  /* const catBreads: IBread[] = orderedCatBreads?.map((item: ICategory) => ({ */
  /*   name: item.name, */
  /*   path: url.category(model.make.slug, model.slug, item.slug), */
  /* })); */

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: search, path: url.search(search) },
  ];

  // Make array for brands filter

  //************************ Filters Section Starts here**********************************************

  const categoriesFilter: IFilter = {
    type: 'category',
    name: 'Категории',
    slug: 'category',
    value: 'dvigatel',
    path: orderedCatBreads,
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
    categoriesFilter
  );
  // ************************** End filters *********************

  const possibleFilters: string[] = sortedFilters.map(
    (item: IFilter) => item.slug
  );

  // Getting filters from state redux
  console.log(filtersFromStore);
  const activeFilters: IActiveFilterMy[] = [];
  for (const [key, value] of Object.entries(routerQuery)) {
    activeFilters.push({
      filterSlug: key,
      filterValues: value.split(','),
    });
  }
  console.log(routerQuery);

  /* const activeFilters: IActiveFilterMy[] = getActiveFilters( */
  /*   /1* routerParams, *1/ */
  /*   routerQuery, */
  /*   filtersFromStore, */
  /*   possibleFilters */
  /* ); */

  // Putting filters from url to store
  /* useEffect(() => { */
  /*   if (!Object.keys(filtersFromStore).length) { */
  /*     for (const filter of activeFilters) { */
  /*       const fvalues = filter.filterValues.join(','); */
  /*       dispatch(shopSetFilterVlue(filter.filterSlug, fvalues)); */
  /*     } */
  /*   } */
  /* }, []); */

  /* // Function for redirection */
  const handleFilterChange = makeHandleFilterChange(
    activeFilters,
    router,
    dispatch,
    model,
    category
  );

  const handleDeleteFilter = makeHandleDeleteFilter(
    router,
    dispatch,
    activeFilters,
    model,
    category
  );
  const handleDeleteFilters = makeHandleDeleteFilters(
    router,
    dispatch,
    model,
    category
  );
  return (
    <React.Fragment>
      <SearchHead searchQuery={'replace for real search later'} />
      <AnimationPage>
        <Container maxWidth={containerMaxWidth}>
          <Grid container>
            <PageHeader header={header} breads={breads} count={count} />
            <Hidden smDown>
              <Grid item xs={3}>
                <LeftSideBar>
                  <FilterWidget
                    filters={sortedFilters}
                    handleChange={handleFilterChange}
                  />
                </LeftSideBar>
              </Grid>
            </Hidden>
            <Grid item xs={12} md={9}>
              <ShopGrid
                products={products.hits}
                totalPages={totalPages}
                filtersResetHandlers={{
                  handleDeleteFilter,
                  handleDeleteFilters,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const routerParams = context.params;
  const routerQuery = context.query;

  // Probably needs to go ouside this file
  // Cleaning filters from pages and main url params
  const filtersQuery = routerQuery;
  const { category, model } = routerQuery;
  const modelSlug: string = model as string;
  if (!category) {
    return {
      notFound: true,
    };
  }
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  const mod: ICar = await getVehicle(modelSlug);

  const slug: string = asString(category);

  // Comment out for building next time here and in static paths
  const cat: ICategory = await getCategoryBySlugGQL(slug);
  //pagination part
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
    url = `?model=${model}&category=${category}&${filUrl}&page_from=${page_from}&page_size=${pageSize}`;
  } else {
    url = `?model=${model}&category=${category}&page_from=${page_from}&page_size=${pageSize}`;
  }
  /* const promise = await getProductsByFilters(url); */
  const promise = await getProductsAll();

  const categories: IAggregationCategory[] =
    promise.aggregations.categories.buckets;
  let products: IProductElasticHitsFirst = promise.hits;
  const prodCount: number = products.total.value;

  const totalPages = Math.ceil(prodCount / pageSize);

  const aggregations: IAgregations = promise.aggregations;

  const catPath = getCatPath(cat, categories);

  const localCatTree: ICategory[] = makeTree(categories);
  let catRet;
  try {
    const cttt = searchTree(localCatTree[0], slug);
    catRet = cttt.children.length ? cttt.children : [];
  } catch (e) {
    catRet = null;
    console.log('Fucks up in ', e);
  }

  if (!promise) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      car: {},
      category: cat,
      categories: catRet,
      products: products,
      model: mod,
      catPath: catPath,
      aggregations,
      totalPages,
      routerQuery,
    },
  };
};
