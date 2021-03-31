import { AbstractFilterBuilder } from '~/services/filters/abstractFilters';
import { IBaseFilterItem, ICheckFilter, IFilter } from '~/interfaces/filters';

import { IAggregationBucket } from '~/interfaces';

export class CheckFilterBulder extends AbstractFilterBuilder {
  private items: IBaseFilterItem[] = [];
  constructor(
    public name: string,
    public slug: string,
    public aggBuckets: IAggregationBucket[],
    public values: string
  ) {
    super(name, slug, aggBuckets, values);
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
      value: this.getValues(),
      items: this.items,
    };

    return filter;
  }

  getValues() {
    let valArr: string[] = [];
    if (typeof this.values === 'string') {
      const split = this.values.split(',');
      for (const item of split) {
        valArr.push(item);
      }
    }
    return valArr;
  }
}
