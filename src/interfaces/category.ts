export interface IMyCategory {
  id: number;
  count: number;
  type: string;
  name: string;
  slug: string;
  image: string;
  layout: string;
  parent: number;
}

// application

export interface IBaseCategory {
  id: number;
  type: string;
  name: string;
  slug: string;
  image: string | null;
  items?: number;
  parent?: this | null;
  children?: this[];
  customFields?: any;
  count?: number;
}

export type IShopCategoryLayout = 'categories' | 'products';

export interface IShopCategory extends IBaseCategory {
  type: 'shop';
  layout: IShopCategoryLayout;
}

export interface IBlogCategory extends IBaseCategory {
  type: 'blog';
}

export type ICategory = IShopCategory | IBlogCategory;
