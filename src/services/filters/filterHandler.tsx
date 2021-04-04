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
