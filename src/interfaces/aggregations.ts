import { ICategory } from './category';

export interface IAggregationBucket extends IAggregationCategory {
  key: string;
  doc_count: number;
}

export interface IAggregationAgg {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: 908;
  buckets: IAggregationBucket[];
  value?: number;
}

export interface IAggregationCategory extends ICategory {}

export interface IAgregations {
  [key: string]: IAggregationAgg;
}
