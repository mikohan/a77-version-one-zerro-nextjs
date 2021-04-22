// application
import { IEngine } from './ICar';
import { IBrand } from './brand';
import { IFilterableList, IPaginatedList } from './list';
import { ICategory } from './category';
import { IMake } from './IMake';
import { ICar } from './ICar';
import { IImage } from './IImage';
import { IAgregations } from './aggregations';

export interface IProductAttribute {
  attribute_name: string;
  attribute_value: string;
  slug: string;
}

export interface IProductStore {
  id: number;
  name: string;
  location_city: string;
  location_address: string;
}

export interface IProductStock {
  id: string;
  store: IProductStore;
  price: number;
  quantity: number;
  availability_days: number;
}

export interface IRating {
  score: string;
  quantity: string;
  autouser?: string;
}
export interface IBreads {
  slug: string;
  name: string;
}

export interface IProduct {
  id: number;
  slug: string;
  name: string;
  name2: string;
  full_name: string;
  one_c_id: string;
  sku?: string;
  active: boolean;
  unit: string;
  // Next group
  cat_number: string;
  catNumber?: string;
  oem_number: string;
  oemNumber?: string;
  partNumber: string;
  brand: IBrand;
  breadcrumbs?: string;
  related: IProduct[]; // Array of related products ids
  // Next section
  category: ICategory[];
  make?: IMake;
  model: ICar[];
  engine?: IEngine[];
  // Section description
  /**
   * A short product description without HTML tags.
   */
  excerpt: string;
  description: string;
  rating?: number | undefined;
  ratingCount?: number;
  created_date?: Date;
  updated_date?: Date;
  // Graphic stuff
  have_photo?: boolean;
  images: IImage[];
  video: string[];
  attributes: IProductAttribute[];

  stocks: IProductStock[];
  badges?: string[];
  reviews?: number;
  tags?: string[];
  condition?: string;
  breads: IBreads[][];
}

export type IProductsList = IPaginatedList<IProduct> &
  IFilterableList<IProduct>;

// Total top level interface
export interface IProductElasticBase {
  took?: number;
  timed_out: boolean;
  _shards: IShards;
  hits: IProductElasticHitsFirst;
  aggregations: IAgregations;
}

interface IShard {
  total: number;
  successful: number;
  skiped: number;
  failed: number;
}

export interface IShards {
  _shards: IShard;
}

export interface IProductElasticHitsFirst {
  total: {
    value: number;
    relation: string;
  };
  max_score: number;
  hits: IProductElasticHitsSecond[];
}

export interface IProductElasticHitsSecond {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: IProduct;
}
