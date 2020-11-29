export interface IBaseFilter<T extends string, V> {
  type?: T;
  name: string;
  slug: string;
  value: V;
}
export interface IBaseFilterItem {
  slug: string;
  name: string;
  count: number;
}

export type ICheckFilterValue = string[];

export type ICheckFilter = IBaseFilter<'check', ICheckFilterValue> & {
  items: IBaseFilterItem[];
};
