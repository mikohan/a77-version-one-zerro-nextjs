import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { Router } from 'next/dist/client/router';
import dynamic from 'next/dynamic';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { searchTree, translateProducts } from '~/utils';
import { getCategoryBySlugGQL } from '~/endpoints/categories';
import { asString } from '~/helpers';
import { IFilter } from '~/interfaces/filters';
import { ICategory, IShopCategory } from '~/interfaces/category';
import { filterPossibleValues } from '~/config';
import { IAgregations, IAggregationCategory } from '~/interfaces/aggregations';
import { IProductElasticHitsFirst } from '~/interfaces/product';
import { makeTree, OrderBreads } from '~/utils';
import ShopGrid from '~/components/product/ShopGrid';
import FilterWidget from '~/components/product/FilterWidget';
import LeftSideBar from '~/components/product/LeftSideBar';
import CategoryHead from '~/components/heads/CategoryHead';
import { getCatPath } from '~/services/utils';
import { IBread, IRouterStuff } from '~/interfaces';
import url from '~/services/url';
import { capitalize } from '~/utils';
import PageHeader from '~/components/product/PageHeader';
import { IState } from '~/interfaces/IState';
import { getProductsByFilters } from '~/endpoints/productEndpoint';
import { IActiveFilterMy } from '~/interfaces';

import {
  shopProductLoading,
  shopSetFilterVlue,
  shopSetOldPrice,
} from '~/store/shop/shopActions';
import { COMPANY_INFORMATION, pageSize } from '~/config';
import {
  getActiveFilters,
  makeHandleDeleteFilter,
  makeHandleDeleteFilters,
  makeHandleFilterChange,
  clearParams,
} from '~/services/filters/filterHandler';
import { createCheckFilters } from '~/services/filters/filterCreater';
// Added stuff for gh
// import AnimationPage from '~/components/common/AnimationPage';
/* const AnimationPage = dynamic( */
/*   () => import('~/components/common/AnimationPage') */
/* ); */

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
  })
);

interface CategoryProps {
  category: IShopCategory;
  categoriesForFilter: ICategory[];
  categoryId?: number;
  products: IProductElasticHitsFirst;
  updated: Date;
  catPath: ICategory[];
  categories: ICategory[];
  aggregations: IAgregations;
  totalPages: number;
  routerQuery: IRouterStuff;
  routerParams: IRouterStuff;
}

export default function AutogoodsCagetory(props: CategoryProps) {
  const {
    category,
    categories,
    products,
    catPath,
    aggregations,
    totalPages,
    routerQuery,
    routerParams,
  } = props;
  const headProds = translateProducts(products.hits);
  const classes = useStyles();

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

  const catName = capitalize(category.name);
  const count = products.total.value;

  const orderedCatBreads = catPath.sort(OrderBreads);
  const catBreads: IBread[] = orderedCatBreads?.map((item: ICategory) => ({
    name: item.name,
    path: url.autogoodsCategory(item.slug),
  }));

  const breads: IBread[] = [
    { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
    ...catBreads,
  ];

  const header = `${catName}`;

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
    'autogoods',
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
    undefined,
    category
  );

  const handleDeleteFilter = makeHandleDeleteFilter(
    router,
    dispatch,
    activeFilters,
    undefined,
    category
  );
  const handleDeleteFilters = makeHandleDeleteFilters(
    router,
    dispatch,
    undefined,
    category
  );
  return (
    <React.Fragment>
      <CategoryHead category={category} products={headProds} breads={breads} />
      {/* <AnimationPage> */}
      <Container className={classes.container}>
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
      {/* </AnimationPage> */}
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const routerParams = context.params;
  const routerQuery = context.query;
  const category = context.params?.slug;

  // Probably needs to go ouside this file
  // Cleaning filters from pages and main url params
  const filtersQuery = clearParams(
    routerQuery as IRouterStuff,
    routerParams as IRouterStuff
  );
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

  const slug: string = asString(category);

  // Comment out for building next time here and in static paths
  let cat = {} as ICategory;
  try {
    cat = await getCategoryBySlugGQL(slug);
  } catch (e) {
    return {
      notFound: true,
    };
  }
  if (!cat) {
    return {
      notFound: true,
    };
  }
  //pagination part
  const str: string = asString(context.query.page as string);
  const page: number = parseInt(str) || 1;

  const page_from = pageSize * (page - 1);

  let url = '';

  if (Object.entries(filtersQuery).length > 0) {
    let filUrl = '';
    let amp = '&';
    Object.entries(filtersQuery).forEach(([filter, value], i) => {
      if (!filterPossibleValues.includes(filter)) {
        return;
      }
      if (i === Object.entries(filtersQuery).length - 1) {
        amp = '';
      }
      filUrl += `${filter}=${value}${amp}`;
    });
    url = `?category=${category}&${filUrl}&page_from=${page_from}&page_size=${pageSize}`;
  } else {
    url = `?category=${category}&page_from=${page_from}&page_size=${pageSize}`;
  }
  const promise = await getProductsByFilters(url);
  if (!promise) {
    return {
      notFound: true,
    };
  }

  const categories: IAggregationCategory[] =
    promise.aggregations.categories.buckets;
  let products: IProductElasticHitsFirst = promise.hits;
  const prodCount: number = products.total.value;
  if (!products) {
    return {
      notFound: true,
    };
  }
  if (!cat) {
    return {
      notFound: true,
    };
  }

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
      catPath: catPath,
      aggregations,
      totalPages,
      routerQuery,
      routerParams,
    },
  };
};
