export interface IAggregationBase {
  key: string;
  doc_count: number;
}

export interface IAggregationCategory {
  key: string | number;
  doc_count: number;
  id: string | number;
  name: string;
  parent: string | number;
  layout?: string;
  type?: string;
}
