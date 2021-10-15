import { IProductElasticHitsSecond } from '~/interfaces';
import { ICategory } from '~/interfaces/category';
import { IFilterQueryString } from '~/interfaces/filters';
import url from '~/services/url';
import { IProduct } from '~/interfaces';

// Function for cloning objects and arrays
export function clone(data: any): any {
  return JSON.parse(JSON.stringify(data));
}
export function error<T>(message: string): Promise<T> {
  return Promise.reject<T>(new Error(message));
}

export function makeTree(cats: any): ICategory[] {
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
    if (o.parent && o.parent !== null) {
      try {
        lookup[o.parent].children.push(o);
      } catch (e) {
        console.error(
          o,
          `Somethin fucks up in /utils makeTree on line 27
            seems to instance of category has no parent
            check the database category id = ${o.id}!
          `,
          e
        );
      }
    } else {
      tree.push(o);
    }
  });
  const new_tree = clone(tree);
  return new_tree;
}

// First letter capitalizer
export const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  const str = s.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Sorting array by name
// Sorting by price needs to be added
// probably i have to refactor it for sorting on server side ?????

export function compareByNameAsc(
  a: IProductElasticHitsSecond,
  b: IProductElasticHitsSecond
) {
  if (a._source.name < b._source.name) {
    return 1;
  }
  if (a._source.name > b._source.name) {
    return -1;
  }
  return 0;
}

export function compareByNameDesc(
  a: IProductElasticHitsSecond,
  b: IProductElasticHitsSecond
) {
  if (a._source.name < b._source.name) {
    return -1;
  }
  if (a._source.name > b._source.name) {
    return 1;
  }
  return 0;
}

export function OrderBreads(a: ICategory, b: ICategory) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

// generic Compare

// Function makes query string frmom active filters

export function makeFiltersQueryString(
  filters: IFilterQueryString,
  model: string,
  category: string
): string {
  let amp = '';
  if (Object.keys(filters).length > 0) {
    amp = '&';
  }
  const filtersUrl = `?&model=${model}&category=${category}&filters_chk=1${amp}`;
  let string = '';
  const mp = Object.entries(filters);
  mp.forEach(([key, value], i) => {
    const amp = mp.length - 1 === i ? '' : '&';
    string += key + '=' + value.toLowerCase() + amp;
  });
  const finalUrl = filtersUrl + string;
  return finalUrl;
}
export function searchTree(element: any, matchingTitle: any): any {
  if (element.slug == matchingTitle) {
    return element;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingTitle);
    }
    return result;
  }
  return null;
}

export function scoreTransformer(val: number) {
  if (val === 1) {
    return 'оценка';
  }
  if (val === 0 || val >= 5) {
    return 'оценок';
  } else if (val > 0 && val < 5) {
    return 'оценки';
  }
}

// Try to translate elastic array to normal product

export function translateProducts(
  array: IProductElasticHitsSecond[]
): IProduct[] {
  return array.map((item: IProductElasticHitsSecond) => {
    return item._source;
  });
}
// function for gettin image width and height by passing product itselg
export function getImageSize(product: IProduct): number[] {
  const width =
    product.images && product.images.length
      ? product.images[0].dimension.width / 6
      : 120;
  const height =
    product.images && product.images.length
      ? product.images[0].dimension.height / 6
      : 120;
  return [width, height];
}

export function emailIsValid(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function removeTags(str: string) {
  if (str === null || str === '') return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, '');
}
export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
export function stripHtml(unsafe: string) {
  return unsafe
    .replace('&amp;', '')
    .replace('&lt;', '')
    .replace('&gt;', '')
    .replace('&nbsp;', '')
    .replace('&#039;', '')
    .replace(/\//g, ' ')
    .replace(/\-/g, ' ')
    .replace(/\n/g, '')
    .replace(/\&/g, '');
}
