import { NextRouter } from 'next/router';
import {
  ICar,
  ICategory,
  IActiveFilterMy,
  IFilterQueryString,
  IFilter,
} from '~/interfaces';
import { shopSetFilterVlue, shopDeleteFilter } from '~/store/shop/shopActions';
import url from '~/services/url';
import { shopResetFilter, shopResetFilters } from '~/store/shop/shopActions';

// Function for redirection
export function makePushUrl(
  router: NextRouter,
  dispatch: any,
  activeFilters: IActiveFilterMy[],
  model: ICar,
  category?: ICategory
) {
  let mainUrl: string = '';
  if (category) {
    mainUrl = url.category(model.make.slug, model.slug, category.slug);
  } else {
    mainUrl = url.model(model.make.slug, model.slug);
  }

  const params = {} as IFilterQueryString;
  for (const [key, value] of Object.entries(activeFilters)) {
    if (value.filterValues.length > 0) {
      params[value.filterSlug] = value.filterValues.join(',');
    }
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

export function makeHandleFilterChange(
  activeFilters: IActiveFilterMy[],

  router: NextRouter,
  dispatch: any,
  model: ICar,
  category: ICategory
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
    makePushUrl(router, dispatch, activeFilters, model, category);
  };
  return handleFilterChange;
}

export function makeHandleDeleteFilter(
  router: NextRouter,
  dispatch: any,
  activeFilters: IActiveFilterMy[],
  model: ICar,
  category: ICategory
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
    makePushUrl(router, dispatch, newFilters, model, category);
  };
  return handleDeleteFilter;
}
export function makeHandleDeleteFilters(
  router: NextRouter,
  dispatch: any,
  model: ICar,
  category: ICategory
) {
  const handleDeleteFilters = () => {
    dispatch(shopResetFilters());
    makePushUrl(router, dispatch, [], model, category);
  };
  return handleDeleteFilters;
}
