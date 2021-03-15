// application
import { IEngine } from './ICar';
import { IBrand } from './brand';
import { IFilterableList, IPaginatedList } from './list';
import { ICategory } from './category';
import { IMake } from './IMake';
import { ICar } from './ICar';
import { IImage } from './IImage';

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
  cat_number: string;
  oem_number: string;
  partNumber: string;
  brand: IBrand;
  breadcrumbs?: string;
  related: string[]; // Array of related products ids
  // Next section
  category: ICategory[];
  make: IMake;
  model: ICar[];
  engine?: IEngine[];
  // Section description
  /**
   * A short product description without HTML tags.
   */
  excerpt: string;
  description: string;
  rating?: number;
  created_date?: Date;
  updated_date?: Date;
  // Graphic stuff
  have_photo?: boolean;
  images: IImage[];
  video: string[];
  attributes: IProductAttribute[];

  stock: IProductStock;
  price: number;
  compareAtPrice: number | null;
  badges?: string[];
  reviews?: number;
  availability?: string;
  tags?: string[];
}

export type IProductsList = IPaginatedList<IProduct> &
  IFilterableList<IProduct>;
