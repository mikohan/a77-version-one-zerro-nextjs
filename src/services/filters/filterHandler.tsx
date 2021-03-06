import { NextRouter } from 'next/router';
import {
  ICar,
  ICategory,
  IActiveFilterMy,
  IFilterQueryString,
  IFilter,
  ITransFilter,
  IRouterStuff,
} from '~/interfaces';
import { shopSetFilterVlue, shopDeleteFilter } from '~/store/shop/shopActions';
import url from '~/services/url';
import { shopResetFilter, shopResetFilters } from '~/store/shop/shopActions';

// function return cleared parms after ?
export function clearParams(
  routerQuery: IRouterStuff,
  routerParams: IRouterStuff
): IRouterStuff {
  let retQuery = {} as IRouterStuff;
  for (const [key, value] of Object.entries(routerQuery)) {
    if (!routerParams.hasOwnProperty(key) && key !== 'page') {
      retQuery[key] = value;
    }
  }
  return retQuery;
}
// Function for redirection
export function makePushUrl(
  router: NextRouter,
  dispatch: any,
  activeFilters: IActiveFilterMy[],
  model?: ICar,
  category?: ICategory,
  search?: string
) {
  let mainUrl: string = '';
  if (category && model) {
    mainUrl = url.category(model.make.slug, model.slug, category.slug);
  } else if (model) {
    mainUrl = url.model(model.make.slug, model.slug);
  } else if (search) {
    mainUrl = url.search();
  }

  const params = {} as IFilterQueryString;
  for (const [key, value] of Object.entries(activeFilters)) {
    if (value.filterValues.length > 0) {
      params[value.filterSlug] = value.filterValues.join(',');
    }
  }
  if (search) {
    params.search = search;
  }

  for (const item of activeFilters) {
    if (item.filterValues.length) {
      dispatch(shopSetFilterVlue(item.filterSlug, item.filterValues.join(',')));
    } else {
      dispatch(shopDeleteFilter(item.filterSlug));
    }
  }
  const urlPush = {
    pathname: mainUrl,
    query: {
      ...params,
    },
  };
  router.push(urlPush);
}

export function orderFilters(
  filters: IFilter[],
  filtersConf: string[]
): IFilter[] {
  let newFilters: IFilter[] = [];
  for (const item of filtersConf) {
    const find = filters.find((i: IFilter) => i.slug === item);
    if (find) {
      newFilters.push(find);
    }
  }
  if (newFilters.length > 0) {
    return newFilters;
  } else {
    return filters;
  }
}

export function getActiveFilters(
  routerParams: IRouterStuff,
  routerQuery: IRouterStuff,
  filtersFromStore: ITransFilter,
  possibleFilters: string[]
): IActiveFilterMy[] {
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
          key === 'sort_price' ||
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
  return activeFilters;
}

export function makeHandleFilterChange(
  activeFilters: IActiveFilterMy[],

  router: NextRouter,
  dispatch: any,
  model?: ICar,
  category?: ICategory,
  search?: string
): (
  e: React.ChangeEvent<HTMLInputElement>,
  filterName: string,
  itemName: string
) => void {
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterName: string,
    itemName: string
  ) => {
    if (filterName === 'price') {
      const idx = activeFilters.findIndex(
        (item: IActiveFilterMy) => item.filterSlug === 'price'
      );
      if (idx === -1) {
        activeFilters.push({ filterSlug: 'price', filterValues: [itemName] });
      } else {
        activeFilters[idx].filterValues = [itemName];
      }
    } else {
      if (
        activeFilters.length &&
        activeFilters.filter((item) => item.filterSlug === filterName).length >
          0
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
    }
    // Call redirect
    if (model) {
      makePushUrl(router, dispatch, activeFilters, model, category);
    } else if (search) {
      makePushUrl(
        router,
        dispatch,
        activeFilters,
        undefined,
        undefined,
        search
      );
    }
  };
  return handleFilterChange;
}

export function makeHandleDeleteFilter(
  router: NextRouter,
  dispatch: any,
  activeFilters: IActiveFilterMy[],
  model?: ICar,
  category?: ICategory,
  search?: string
) {
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
    if (model) {
      makePushUrl(router, dispatch, newFilters, model, category);
    } else if (search) {
      makePushUrl(router, dispatch, newFilters, undefined, undefined, search);
    }
  };
  return handleDeleteFilter;
}
export function makeHandleDeleteFilters(
  router: NextRouter,
  dispatch: any,
  model?: ICar,
  category?: ICategory,
  search?: string
) {
  const handleDeleteFilters = () => {
    dispatch(shopResetFilters());
    if (model) {
      makePushUrl(router, dispatch, [], model, category);
    } else if (search) {
      makePushUrl(router, dispatch, [], undefined, undefined, search);
    }
  };
  return handleDeleteFilters;
}
