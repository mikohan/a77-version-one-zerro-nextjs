// application
import { IBaseCategory, ICategory } from '~/interfaces/category';

export function baseUrl(url: string): string {
  if (/^\/([^/]|$)/.test(url)) {
    return `${process.env.basePath}${url}`;
  }

  return url;
}

export function getCategoryPath<T extends IBaseCategory>(
  category: T | null | undefined
): T[] {
  return category ? [...getCategoryPath(category.parent), category] : [];
}

export function getCategoryParents(category: ICategory): ICategory[] {
  return category.parent
    ? [...getCategoryParents(category.parent), category.parent]
    : [];
}

export function isArrayOfStrings(value: any): value is string[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return !value.map((x) => typeof x !== 'string').includes(true);
}

export function isArrayOfNumbers(value: any): value is number[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return !value.map((x) => typeof x !== 'number').includes(true);
}

export function distinctArray(arr: any[], key = 'id') {
  const start = new Date().valueOf();
  let resArr: any[] = [];
  arr.forEach(function (item) {
    var i = resArr.findIndex((x) => x._source.id === item._source.id);
    if (i <= -1) {
      resArr.push(item);
    }
  });
  let time = new Date().valueOf() - start;
  console.log('Console.log in services.utils.ts. Unicalization takes : ', time);
  return resArr;
}

// Function for finding whole path to given category
export function getCatPath(
  category: ICategory,
  categories: ICategory[]
): ICategory[] {
  let mainCat;
  function getCategoryPath(
    category: ICategory,
    categories: ICategory[]
  ): ICategory[] {
    let parent = getParent(category.parent);
    if (category.parent === null) {
      mainCat = category;
    }
    return parent ? [...getCategoryPath(parent, categories), category] : [];
  }

  function getParent(parentId: any) {
    const parent = categories.find((element) => element.id == parentId);

    return parent;
  }

  const pathArr = getCategoryPath(category, categories);
  if (mainCat) {
    pathArr.push(mainCat);
  }
  return pathArr;
}

export function getParentCategory(
  category: ICategory,
  categories: ICategory[]
) {
  const parent = categories.find(
    (element: ICategory) => element.id == category.id
  );

  return parent;
}

// const cat = categories.find((el: ICategory) => el.id === 2769);
// const path = getCatPath(cat, categories);
// console.log(path);
