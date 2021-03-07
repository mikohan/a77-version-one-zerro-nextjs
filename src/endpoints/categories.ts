import { clone, error } from '~/utils';
import axios from 'axios';
import { categoriesUrl, cagegoriesUrl } from '~/config';

import { IBaseCategory, IShopCategory } from '~/interfaces/category';
import {
  IGetCategoriesOptions,
  IGetCategoryBySlugOptions,
} from '~/interfaces/api/shop.api';

/*
Whole file logic
1. Get flat categories(with one level parnet in them) from api url is /testcategory/testcategories/
2. Make Tree from that flat list 
3. Category by slug finding in that list(logic from RedParts)
 a. Functin takes all categories from Server
 b. Then it is finding category by slug in that mess
4. Next logic will be here
*/

export function prepareCategory<T extends IBaseCategory>(
  category: T,
  depth?: number
): T {
  let children;

  if (depth && depth > 0) {
    children = (category.children || []).map((x) =>
      prepareCategory(x, depth - 1)
    );
  }

  let parent;

  if (category.parent && Object.keys(category.parent).length !== 0) {
    parent = prepareCategory(category.parent);
  } else if (
    category.parent === null ||
    Object.keys(category.parent!).length === 0
  ) {
    parent = null;
  }
  const categoryToReturn = JSON.parse(
    JSON.stringify({
      ...category,
      parent,
      children,
    })
  );
  return categoryToReturn;
}

// Flatting cagegories
export function flatTree<T extends IShopCategory>(categories: T[]): T[] {
  let result: T[] = [];

  categories.forEach((category) => {
    result = [...result, category, ...flatTree(category.children as T[])];
  });

  return result;
}

export async function getCategoryBySlug(
  slug: string,
  options?: IGetCategoryBySlugOptions
): Promise<IShopCategory> {
  const optionsValue = options || {};
  const shopCategoriesTree: any = await makeCategoriesFromApi();
  const shopCategoriesList: IShopCategory[] = flatTree(shopCategoriesTree);

  const category = shopCategoriesList.find((x: any) => x.slug === slug);

  if (!category) {
    return error('Page Not Found Needs to find Where it is coling from');
  }

  return Promise.resolve(category);
}

export async function makeCategoriesFromApi<T extends IBaseCategory>(): Promise<
  IShopCategory
> {
  const res = async () => {
    const promise = await axios.get<T[]>(`${categoriesUrl}`);

    return promise.data;
  };

  const cats = await res();
  // filtering empty categories here
  const filtredArray = cats.filter((item: T) => {
    return item.count !== 0;
  });

  const list: T[] = filtredArray;

  const tree: T[] = [];
  const lookup: any = {};

  list.forEach((o: T) => {
    lookup[o.id] = o;
    lookup[o.id].children = [];
  });

  list.forEach((o: T) => {
    if (o.parent && o.parent !== null) {
      lookup[o.parent.id].children.push(o);
    } else {
      tree.push(o);
    }
  });

  return Promise.resolve(clone(tree));
}

export async function getCategories(
  options?: IGetCategoriesOptions
): Promise<IShopCategory[]> {
  const shopCategoriesTree: any = await makeCategoriesFromApi();

  const shopCategoriesList: IShopCategory[] = flatTree(shopCategoriesTree);

  let categories = await shopCategoriesTree.slice(0);

  const depth = options?.depth || 0;
  const optionParent = options?.parent;
  const optionSlugs = options?.slugs;

  if (optionParent) {
    const parent = shopCategoriesList.find(
      (x: any) => x.slug === optionParent.slug
    );

    if (parent) {
      categories = parent.children || [];
    }
  } else if (optionSlugs) {
    categories = shopCategoriesList.filter((x: any) =>
      optionSlugs.includes(x.slug)
    );
  }

  categories = categories.map((x: any) => prepareCategory(x, depth));
  console.log(categories, 'In endpoint');
  return Promise.resolve(clone(categories));
}

// export function getBlogCategories(
//   options: IGetBlogCategoriesOptions
// ): Promise<IBlogCategory[]> {
//   let categories = blogCategoriesTree.slice(0);
//   const depth = options.depth || 0;

//   categories = categories.map((x) => prepareCategory(x, depth));

//   return Promise.resolve(clone(categories));
// }
