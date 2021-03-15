import { ICar } from '~/interfaces/ICar';
import cookie from 'cookie';
import { IMake } from './interfaces/IMake';

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

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export function toLoverSpace(string: string): string {
  return string.replace(' ', '').toLowerCase();
}

// Makes distinct array of makes from all vehicles
export const buildMakes = (array: ICar[]): IMake[] => {
  return Array.from(new Set(array.map((item: ICar) => item.make)));
};
// Another variant for upper function
export function extractor(vehicles: ICar[]): IMake[] {
  let makes: IMake[] = [];
  try {
    for (let i = 0; i < vehicles.length; i++) {
      if (!makes.includes(vehicles[i].make)) {
        makes.push(vehicles[i].make);
      }
    }
  } catch (e) {
    console.log('Error while extractin makes from vehicles in helpers.ts');
  }
  return makes;
}
