import { ICar } from '~/interfaces/ICar';

export function asString(query: string | string[]) {
  if (Array.isArray(query)) {
    return query[0];
  }
  return query;
}

// Url builder for filters
export const urlBuilder = (
  query: string | string[],
  event: React.ChangeEvent<HTMLInputElement>
): string[] => {
  let brands: string[] = [];
  if (Array.isArray(query)) {
    brands = [...query];
  } else if (query) {
    brands.push(query);
  }

  if (event.target.checked) {
    brands.push(event.target.value);
  }
  if (event.target.checked === false) {
    brands = brands.filter((val: any) => {
      return val !== event.target.value;
    });
  }

  return brands;
};

// Makes distinct array of makes from all vehicles

export const buildMakes = (array: ICar[]): string[] => {
  return Array.from(new Set(array.map((item: ICar) => item.make)));
};

import cookie from 'cookie';

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
