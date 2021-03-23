export interface IAggregationBucket extends IAggregationCategory {
  key: string;
  doc_count: number;
}

export interface IAggregationAgg {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: 908;
  buckets: IAggregationBucket[];
}

export interface IAggregationCategory {
  id?: string | number;
  name?: string;
  parent?: string | number;
  layout?: string;
  type?: string;
  slug: string;
}

export interface IAgregations {
  [key: string]: IAggregationAgg;
}
