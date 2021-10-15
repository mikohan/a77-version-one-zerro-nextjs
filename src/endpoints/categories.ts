import { clone, error } from '~/utils';
import { getProductsAll } from '~/endpoints/productEndpoint';
import { client } from './apolloClient';
import { gql } from '@apollo/client';

import { IBaseCategory, ICategory, IShopCategory } from '~/interfaces/category';
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

// Get all categories related stuff
export async function makeCategoriesFromApi<T extends IBaseCategory>(): Promise<
  IShopCategory
> {
  const res = async () => {
    //  const promise = await axios.get<T[]>(`${categoriesUrl}`);

    const promise = await getProductsAll();
    const cats: T[] = promise.aggregations.categories.buckets;
    return cats;
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
      lookup[o.parent].children.push(o);
    } else {
      tree.push(o);
    }
  });

  return Promise.resolve(clone(tree));
}

export async function getCategoriesOld(
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

// Function returning all NON EMPTY Caterories !!!
export async function getCategories<T extends ICategory>(): Promise<
  ICategory[]
> {
  const promise = await getProductsAll();
  const cats: T[] = promise.aggregations.categories.buckets;
  return Promise.resolve(clone(cats));
}

// const client = ...
export async function getCategoryBySlugGQL(slug: string): Promise<ICategory> {
  const query = gql`
    query($slug: String!) {
      categoryBySlug(slug: $slug) {
        id
        name
        slug
        parent
        image
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      slug: slug,
    },
  });
  return await promise.data.categoryBySlug;
}
export async function getCategoryAllGQL(): Promise<ICategory[]> {
  const query = gql`
    query {
      categoryAll {
        id
        name
        slug
        parent
        image
      }
    }
  `;
  const promise = await client.query({
    query: query,
  });
  return await promise.data.categoryAll;
}

export async function getCategoryTop(): Promise<ICategory[]> {
  const query = gql`
    query {
      categoryTop {
        id
        name
        slug
        image
        parent
        count
        weight
      }
    }
  `;
  const promise = await client.query({
    query: query,
  });
  return await promise.data.categoryTop;
}
