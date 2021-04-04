import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';

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
import { getProductsByCar } from '~/endpoints/productEndpoint';
import { makeTree, OrderBreads } from '~/utils';
import ShopGrid from '~/components/product/ShopGrid';
import { Hidden } from '@material-ui/core';
import FilterWidget from '~/components/product/FilterWidget';
import LeftSideBar from '~/components/product/LeftSideBar';
import CategoryHead from '~/components/heads/CategoryHead';
import { getCatPath } from '~/services/utils';
import { IBread } from '~/interfaces';
import url from '~/services/url';
import { capitalize } from '~/utils';
import PageHeader from '~/components/product/PageHeader';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { getProductsByFilters } from '~/endpoints/productEndpoint';
import { IActiveFilterMy } from '~/interfaces';
import { shopResetFilter, shopSetFilterVlue } from '~/store/shop/shopActions';
import { CheckFilterBulder } from '~/services/filters/filtersBuilder';
import { getProductsByCarModel } from '~/endpoints/productEndpoint';
import { pageSize } from '~/config';
import { shopResetFilters } from '~/store/shop/shopActions';
import { makePushUrl } from '~/services/filters/filterHandler';

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
  routerQuery: object;
  routerParams: object;
}

export default function Cagetory(props: CategoryProps) {
  const {
    category,
    categories,
    make,
    model,
    updated,
    products,
    catPath,
    aggregations,
    totalPages,
    routerQuery,
    routerParams,
  } = props;
  const router = useRouter();

  const [stateAggregations, setStateAggragations] = useState(aggregations);

  const [stateCount, setStateCount] = useState(products.total.value);
  const fils = useSelector((state: IState) => state.shopNew.filters);
  const dispatch = useDispatch();

  const modelName = capitalize(model.model);
  const makeName = capitalize(model.make.name);
  const catName = capitalize(category.name);
  const header = `${catName} на  ${makeName} ${modelName}`;

  const orderedCatBreads = catPath.sort(OrderBreads);
  const catBreads: IBread[] = orderedCatBreads?.map((item: ICategory) => ({
    name: item.name,
    path: url.category(model.make.slug, model.slug, item.slug),
  }));

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: model.make.name, path: url.make(model.make.slug) },
    { name: model.model, path: url.model(model.make.slug, model.slug) },
    ...catBreads,
  ];

  // Make array for brands filter

  //************************ Filters Section Starts here**********************************************

  const categoriesFilter: IFilter = {
    type: 'category',
    name: 'category',
    slug: 'category',
    value: 'dvigatel',
    path: orderedCatBreads,
    items: categories,
  };
  function getInitVals(filterSlug: string): string {
    return (router.query[filterSlug] as string) || fils[filterSlug];
  }

  const brandsClass = new CheckFilterBulder(
    'Бренды',
    'brand',
    aggregations.brands.buckets,
    getInitVals('brand')
  );
  const brands = brandsClass.buildFilter();
  // llllllllllllllllllllllllll

  const filterEngine = new CheckFilterBulder(
    'Двигатель',
    'engine',
    aggregations.engines.buckets,
    getInitVals('engine')
  );
  const engines = filterEngine.buildFilter();
  //////////////////////////////////////////
  const filterBages = new CheckFilterBulder(
    'Теги',
    'bages',
    aggregations.bages.buckets,
    getInitVals('bages')
  );
  const bages = filterBages.buildFilter();
  // ************************** Price filters *********************
  let minPrice: number = 0;
  let maxPrice: number = 0;
  if (
    stateAggregations.hasOwnProperty('min_price') &&
    stateAggregations.hasOwnProperty('max_price')
  ) {
    minPrice = stateAggregations.min_price.value as number;
    maxPrice = stateAggregations.max_price.value as number;
  }

  const price: IFilter = {
    type: 'range',
    name: 'Цена',
    slug: 'price',
    value: [minPrice, maxPrice],
    min: minPrice,
    max: maxPrice,
  };

  const bucketsFilters: any = { brands, engines, bages };
  const filters: IFilter[] = [categoriesFilter, price];

  for (const [key, value] of Object.entries(aggregations)) {
    if (value.hasOwnProperty('buckets') && value.buckets.length > 0) {
      if (bucketsFilters[key]) {
        filters.push(bucketsFilters[key]);
      }
    }
  }
  /* filters.push(); */
  // ************************** End filters *********************

  const possibleFilters: string[] = filters.map((item: IFilter) => item.slug);

  // Getting filters from state redux
  const filtersFromStore = useSelector(
    (state: IState) => state.shopNew.filters
  );

  let activeFilters: IActiveFilterMy[] = [];
  if (Object.keys(filtersFromStore).length) {
    for (const [key, value] of Object.entries(filtersFromStore)) {
      activeFilters.push({
        filterSlug: key,
        filterValues: value.split(','),
      });
    }
  } else {
    for (const [key, value] of Object.entries(routerQuery)) {
      if (!routerParams.hasOwnProperty(key)) {
        if (
          possibleFilters.includes(key) ||
          key === 'filters_chk' ||
          key === 'page'
        ) {
          if (key === 'page') {
            continue;
          }
          if (value !== '') {
            activeFilters.push({
              filterSlug: key,
              filterValues: value.split(','),
            });
          }
        } else {
          const e = new Error(
            'Some bullshit in query strint here the point to make redirect to 404'
          );
          throw e;
        }
      }
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

  // Function for redirection

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterName: string,
    itemName: string
  ) => {
    if (
      activeFilters.length &&
      activeFilters.filter((item) => item.filterSlug === filterName).length > 0
    ) {
      const clickedFilter = activeFilters?.findIndex(
        (filter: IActiveFilterMy) => filter.filterSlug === filterName
      );
      const activeFilter = activeFilters[clickedFilter];
      if (activeFilter.filterValues.includes(itemName)) {
        // delete from des
        const idx = activeFilter.filterValues.indexOf(itemName);
        activeFilter.filterValues.splice(idx, 1);
      } else {
        // add to des
        activeFilter.filterValues.push(itemName);
      }
      activeFilters[clickedFilter] = activeFilter;
    } else {
      activeFilters.push({
        filterSlug: filterName,
        filterValues: [itemName],
      });
    }
    // Call redirect
    makePushUrl(router, dispatch, activeFilters, model, category);
  };

  const handleDeleteFilter = (filterSlug: string, filterValue: string) => {
    dispatch(shopResetFilter(filterSlug, filterValue));
    const idx = activeFilters.findIndex(
      (item: IActiveFilterMy) => item.filterSlug === filterSlug
    );
    const filVals = activeFilters[idx].filterValues;
    const idxv = filVals.indexOf(filterValue);
    filVals.splice(idxv, 1);
    activeFilters[idx].filterValues = filVals;

    const newFilters = [...activeFilters];
    makePushUrl(router, dispatch, newFilters, model, category);
  };
  const handleDeleteFilters = () => {
    dispatch(shopResetFilters());
    makePushUrl(router, dispatch, [], model, category);
  };

  return (
    <React.Fragment>
      <CategoryHead model={model} category={category} />
      <AnimationPage>
        <Grid container>
          <div onClick={() => dispatch(shopResetFilter('brand', 'pos'))}>
            click
          </div>
          <PageHeader header={header} breads={breads} count={stateCount} />
          <Hidden smDown>
            <Grid item xs={3}>
              <LeftSideBar>
                <FilterWidget
                  filters={filters}
                  handleChange={handleFilterChange}
                />
              </LeftSideBar>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={9}>
            <ShopGrid
              products={products.hits}
              totalPages={totalPages}
              filtersResetHandlers={{ handleDeleteFilter, handleDeleteFilters }}
            />
          </Grid>
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
  const { category, make, model } = context.params!;
  const modelSlug: string = model as string;
  if (!category) {
    return {
      notFound: true,
    };
  }
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  function searchTree(element: any, matchingTitle: any): any {
    if (element.slug == matchingTitle) {
      return element;
    } else if (element.children != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = searchTree(element.children[i], matchingTitle);
      }
      return result;
    }
    return null;
  }
  // sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  const mod: ICar = await getVehicle(modelSlug);

  const slug: string = asString(category);

  // Comment out for building next time here and in static paths
  const cat: ICategory = await getCategoryBySlugGQL(slug);
  //pagination part
  const str: string = asString(context.query.page as string);
  const page: number = parseInt(str) || 1;

  const page_from = pageSize * (page - 1);

  const promise = await getProductsByCar(
    modelSlug,
    page_from,
    pageSize,
    cat.slug
  );
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
      make: make,
      model: mod,
      updated: Date.now(),
      catPath: catPath,
      aggregations,
      totalPages,
      routerQuery,
      routerParams,
    },
  };
};
