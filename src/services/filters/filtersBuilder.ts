import { AbstractFilterBuilder } from '~/services/filters/abstractFilters';
import { IBaseFilterItem, ICheckFilter, IFilter } from '~/interfaces/filters';

import { IProductElasticHitsSecond } from '~/interfaces/product';
import { IAggregationBucket } from '~/interfaces';

export class CheckFilterBulder extends AbstractFilterBuilder {
  private items: IBaseFilterItem[] = [];
  constructor(
    public name: string,
    public slug: string,
    public aggBuckets: IAggregationBucket[],
    public value: string[]
  ) {
    super(name, slug, aggBuckets, value);
  }

  buildFilter(): IFilter {
    this.items = this.aggBuckets.map((item: IAggregationBucket) => ({
      name: item.key,
      count: item.doc_count,
    }));
    const filter: IFilter = {
      type: 'check',
      name: this.name,
      slug: this.slug,
      value: this.value,
      items: this.items,
    };

    return filter;
  }
}
