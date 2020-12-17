import { clone } from '~/utils';
import axios from 'axios';
import { categoriesUrl } from '~/config';

import { IBaseCategory, IShopCategory, ICategory } from '~/interfaces/category';
import { IGetCategoriesOptions } from '~/interfaces/api/shop.api';

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
export function flatTree<T extends ICategory>(categories: T[]): T[] {
  let result: T[] = [];

  categories.forEach((category) => {
    result = [...result, category, ...flatTree(category.children as T[])];
  });

  return result;
}

// export async function getCategoryBySlug(
//   slug: string,
//   options?: IGetCategoryBySlugOptions
// ): Promise<IShopCategory> {
//   const optionsValue = options || {};
//   const shopCategoriesTree: any = await makeCategoriesFromApi();
//   const shopCategoriesList: any = await flatTree(shopCategoriesTree);
//   // console.log(shopCategoriesTree);

//   const category = shopCategoriesList.find((x: any) => x.slug === slug);
//   // console.log('--------------------------');
//   // console.log('Find category in list', category);
//   console.log(slug, 'In getCategories by slug');

//   if (!category) {
//     return error('Page Not Found Needs to find Where it is coling from');
//   }

//   return Promise.resolve(category);
// }

export async function makeCategoriesFromApi<T extends IBaseCategory>(): Promise<
  IShopCategory
> {
  const res = async () => {
    const promise = await axios.get(`${categoriesUrl}`);

    return promise.data;
  };

  const cats = await res();
  // filtering empty categories here
  const filtredArray = cats.filter((item: any) => {
    return item.count !== 0;
  });

  const list: any = filtredArray;

  const tree: any = [];
  const lookup: any = {};

  list.forEach((o: any) => {
    lookup[o.id] = o;
    lookup[o.id].children = [];
  });

  list.forEach((o: any) => {
    if (o.parent !== null) {
      lookup[o.parent.id].children.push(o);
    } else {
      tree.push(o);
    }
  });

  return tree;
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
