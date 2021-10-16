import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { ICar } from '~/interfaces/ICar';
import { asString } from '~/helpers';
import { IFilter } from '~/interfaces/filters';
import { ICategory, IShopCategory } from '~/interfaces/category';
import AnimationPage from '~/components/common/AnimationPage';
import { IAgregations } from '~/interfaces/aggregations';
import { IProductElasticHitsFirst } from '~/interfaces/product';
import ShopGrid from '~/components/product/ShopGrid';
import { Hidden } from '@material-ui/core';
import FilterWidget from '~/components/product/FilterWidget';
import LeftSideBar from '~/components/product/LeftSideBar';
import SearchHead from '~/components/heads/SearchHead';
import { IBread, IRouterStuff } from '~/interfaces';
import url from '~/services/url';
import PageHeader from '~/components/product/PageHeader';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { getProductsBySearch } from '~/endpoints/productEndpoint';
import { IActiveFilterMy } from '~/interfaces';
import { Router } from 'next/dist/client/router';
import {
  shopProductLoading,
  shopSetFilterVlue,
  shopSetOldPrice,
} from '~/store/shop/shopActions';
import { COMPANY_INFORMATION, pageSize } from '~/config';
import {
  makeHandleDeleteFilter,
  makeHandleDeleteFilters,
  makeHandleFilterChange,
} from '~/services/filters/filterHandler';
import { createCheckFilters } from '~/services/filters/filterCreater';

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
import { capitalize } from '~/utils';
import CarChoiser from '~/components/car/CarChoiserLong';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '0 auto',
      [theme.breakpoints.down('lg')]: {
        maxWidth: '85%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '80%',
      },
      [theme.breakpoints.up('xxl')]: {
        maxWidth: '75%',
      },
      paddingBottom: theme.spacing(3),
    },
    notFound: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: theme.spacing(30),
    },
  })
);

export default function Search(props: CategoryProps) {
  const classes = useStyles();
  const { products, aggregations, totalPages, routerQuery } = props;

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
  let search = routerQuery.search;

  const header = search ? `${capitalize(search)}` : '';
  const count = products.total.value;

  /* const catBreads: IBread[] = orderedCatBreads?.map((item: ICategory) => ({ */
  /*   name: item.name, */
  /*   path: url.category(model.make.slug, model.slug, item.slug), */
  /* })); */

  const breads: IBread[] = [
    { name: COMPANY_INFORMATION.COMPANY_NAME_ENG, path: '/' },
    { name: search, path: url.search(search) },
  ];

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
    'search'
  );
  // ************************** End filters *********************

  /* const possibleFilters: string[] = sortedFilters.map( */
  /*   (item: IFilter) => item.slug */
  /* ); */

  // Getting filters from state redux
  const activeFilters: IActiveFilterMy[] = [];
  for (const [key, value] of Object.entries(routerQuery)) {
    if (key !== 'page') {
      activeFilters.push({
        filterSlug: key,
        filterValues: value.split(','),
      });
    }
  }

  // Putting filters from url to store
  useEffect(() => {
    if (!Object.keys(filtersFromStore).length) {
      for (const filter of activeFilters) {
        const fvalues = filter.filterValues.join(',');
        dispatch(shopSetFilterVlue(filter.filterSlug, fvalues));
      }
    }
  }, []);

  /* // Function for redirection */
  const handleFilterChange = makeHandleFilterChange(
    activeFilters,
    router,
    dispatch,
    undefined,
    undefined,
    search
  );

  const handleDeleteFilter = makeHandleDeleteFilter(
    router,
    dispatch,
    activeFilters,
    undefined,
    undefined,
    search
  );
  const handleDeleteFilters = makeHandleDeleteFilters(
    router,
    dispatch,
    undefined,
    undefined,
    search
  );

  function NotFound() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12} justify="center">
            <Paper className={classes.notFound}>
              <Typography variant="h4">Ничего не найдено :(</Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <SearchHead searchQuery={search} />
      <AnimationPage>
        <Box className={classes.container}>
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
              <Grid container>
                <Grid item xs={12}>
                  <CarChoiser size="sm" />
                </Grid>
                <Grid item xs={12}>
                  {products.hits.length > 0 ? (
                    <ShopGrid
                      products={products.hits}
                      totalPages={totalPages}
                      filtersResetHandlers={{
                        handleDeleteFilter,
                        handleDeleteFilters,
                      }}
                    />
                  ) : (
                    <NotFound />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const routerQuery = context.query;
  /* let carSlug: string = ''; */

  // Probably needs to go ouside this file
  // Cleaning filters from pages and main url params
  const filtersQuery = Object.assign({}, routerQuery);
  if (filtersQuery.hasOwnProperty('page')) {
    delete filtersQuery.page;
  }
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

  // Comment out for building next time here and in static paths
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
    url = `?${filUrl}&page_from=${page_from}&page_size=${pageSize}`;
  } else {
    url = `?&page_from=${page_from}&page_size=${pageSize}`;
  }

  const promise = await getProductsBySearch(url);

  /* const categories: IAggregationCategory[] = */
  /*   promise.aggregations.categories.buckets; */
  let products: IProductElasticHitsFirst = promise.hits;
  const prodCount: number = products.total.value;

  const totalPages = Math.ceil(prodCount / pageSize);

  const aggregations: IAgregations = promise.aggregations;

  /* const localCatTree: ICategory[] = makeTree(categories); */

  if (!promise) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      car: {},
      /* category: cat, */
      /* categories: catRet, */
      products: products,
      /* catPath: catPath, */
      aggregations,
      totalPages,
      routerQuery,
    },
  };
};
