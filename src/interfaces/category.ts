export interface ICategory extends IBaseCategory {
  layout?: string;
  type?: string;
}

// application

export interface IBaseCategory {
  id: number;
  type?: string;
  name: string;
  slug: string;
  image?: string | null;
  items?: number;
  parent?: this | null;
  children?: this[];
  customFields?: any;
  count?: number;
  weight?: number;
}

export type IShopCategoryLayout = 'categories' | 'products';

export interface IShopCategory extends IBaseCategory {
  type: 'shop';
  layout?: IShopCategoryLayout;
}

export interface IBlogCategory extends IBaseCategory {
  type?: 'blog';
  postsCount: number;
}
