import { IAggregationBucket } from '~/interfaces';
import { IFilter } from '~/interfaces/filters';

export abstract class AbstractFilterBuilder {
  constructor(
    public slug: string,
    public name: string,
    public aggBuckets: IAggregationBucket[],
    public values: string
  ) {}

  abstract buildFilter(): IFilter;
  abstract getValues(): string[];
}
