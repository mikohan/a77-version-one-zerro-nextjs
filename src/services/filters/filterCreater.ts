import { CheckFilterBulder } from '~/services/filters/filtersBuilder';
import { IFilter, IAgregations, ITransFilter } from '~/interfaces';
import { orderFilters } from '~/services/filters/filterHandler';
import { filtersConf } from '~/config';

export function createCheckFilters(
  router: any,
  aggregations: IAgregations,
  filtersFromStore: ITransFilter,
  oldPrice: number[],
  categoriesFilter?: IFilter
): IFilter[] {
  function getInitVals(filterSlug: string): string {
    return (router.query[filterSlug] as string) || filtersFromStore[filterSlug];
  }
  const brandsClass = new CheckFilterBulder(
    'Бренды',
    'brand',
    aggregations.brands.buckets,
    getInitVals('brand')
  );
  const brands = brandsClass.buildFilter();
  // llllllllllllllllllllllllll
  const photoClass = new CheckFilterBulder(
    'Фото',
    'has_photo',
    aggregations.has_photo.buckets,
    getInitVals('has_photo')
  );
  const has_photo = photoClass.buildFilter();

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
  // Condition filter
  const filterCondition = new CheckFilterBulder(
    'Состояние',
    'condition',
    aggregations.condition.buckets,
    getInitVals('condition')
  );
  const condition = filterCondition.buildFilter();
  const bucketsFilters: { [key: string]: IFilter } = {
    brands,
    engines,
    bages,
    has_photo,
    condition,
  };

  let minPrice: number = 0;
  let maxPrice: number = 0;
  if (
    aggregations.hasOwnProperty('min_price') &&
    aggregations.hasOwnProperty('max_price')
  ) {
    minPrice = aggregations.min_price.value as number;
    maxPrice = aggregations.max_price.value as number;
  }

  const price: IFilter = {
    type: 'range',
    name: 'Цена',
    slug: 'price',
    value: [minPrice, maxPrice],
    min: oldPrice[0],
    max: oldPrice[1],
  };

  let filters: IFilter[] = [price];
  if (categoriesFilter) {
    filters.push(categoriesFilter);
  }
  for (const [key, value] of Object.entries(aggregations)) {
    if (value.hasOwnProperty('buckets') && value.buckets.length > 0) {
      if (bucketsFilters[key]) {
        filters.push(bucketsFilters[key]);
      }
    }
  }
  const sortedFilters: IFilter[] = orderFilters(filters, filtersConf);

  return sortedFilters;
}
